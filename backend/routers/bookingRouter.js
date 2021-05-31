import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Booking from '../models/bookingModel.js';
import User from '../models/userModel.js';
import Table from '../models/tableModel.js';
import {
  isAdmin,
  isAuth,
  isSellerOrAdmin,
  mailgun,
  payBookingEmailTemplate,
} from '../utils1.js';

const bookingRouter = express.Router();
bookingRouter.get(
  '/',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const seller = req.query.seller || '';
    const sellerFilter = seller ? { seller } : {};

    const bookings = await Booking.find({ ...sellerFilter }).populate(
      'user',
      'name'
    );
    res.send(bookings);
  })
);

bookingRouter.get(
  '/summary',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const bookings = await Booking.aggregate([
      {
        $group: {
          _id: null,
          numBookings: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);
    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const dailyBookings = await Booking.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          bookings: { $sum: 1 },
          sales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const tableCategories = await Table.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({ users, bookings, dailyBookings, tableCategories });
  })
);

bookingRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id });
    res.send(bookings);
  })
);

bookingRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.bookingItems.length === 0) {
      res.status(400).send({ message: 'Cart Table is empty' });
    } else {
      const booking = new Booking({
        seller: req.body.bookingItems[0].seller,
        bookingItems: req.body.bookingItems,
        bookingTable: req.body.bookingTable,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdBooking = await booking.save();
      res
        .status(201)
        .send({ message: 'New Booking Created', booking: createdBooking });
    }
  })
);

bookingRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
      res.send(booking);
    } else {
      res.status(404).send({ message: 'Booking Not Found' });
    }
  })
);

bookingRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id).populate(
      'user',
      'email name'
    );
    if (booking) {
      booking.isPaid = true;
      booking.paidAt = Date.now();
      booking.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedBooking = await booking.save();
      mailgun()
        .messages()
        .send(
          {
            from: 'Restaurant <restaurant@mg.yourdomain.com>',
            to: `${booking.user.name} <${booking.user.email}>`,
            subject: `New booking ${booking._id}`,
            html: payBookingEmailTemplate(booking),
          },
          (error, body) => {
            if (error) {
              console.log(error);
            } else {
              console.log(body);
            }
          }
        );
      res.send({ message: 'Booking Paid', booking: updatedBooking });
    } else {
      res.status(404).send({ message: 'Booking Not Found' });
    }
  })
);

bookingRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
      const deleteBooking = await booking.remove();
      res.send({ message: 'Booking Deleted', booking: deleteBooking });
    } else {
      res.status(404).send({ message: 'Booking Not Found' });
    }
  })
);

bookingRouter.put(
  '/:id/deliver',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
      booking.isDelivered = true;
      booking.deliveredAt = Date.now();

      const updatedBooking = await booking.save();
      res.send({ message: 'Booking Delivered', booking: updatedBooking });
    } else {
      res.status(404).send({ message: 'Booking Not Found' });
    }
  })
);

export default bookingRouter;
