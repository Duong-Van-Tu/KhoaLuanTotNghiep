import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Table from '../models/tableModel.js';
import User from '../models/userModel.js';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils1.js';

const tableRouter = express.Router();

tableRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const pageSize = 3;
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || '';
    const category = req.query.category || '';
    const seller = req.query.seller || '';
    const booking = req.query.booking || '';
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const sellerFilter = seller ? { seller } : {};
    const categoryFilter = category ? { category } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortBooking =
      booking === 'lowest'
        ? { price: 1 }
        : booking === 'highest'
        ? { price: -1 }
        : booking === 'toprated'
        ? { rating: -1 }
        : { _id: -1 };
    const count = await Table.count({
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    const tables = await Table.find({
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .populate('seller', 'seller.name seller.logo')
      .sort(sortBooking)
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res.send({ tables, page, pages: Math.ceil(count / pageSize) });
  })
);

tableRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Table.find().distinct('category');
    res.send(categories);
  })
);

tableRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await table.remove({});
    const seller = await User.findOne({ isSeller: true });
    if (seller) {
      const tables = data.tables.map((table) => ({
        ...table,
        seller: seller._id,
      }));
      const createdTables = await Table.insertMany(tables);
      res.send({ createdTables });
    } else {
      res
        .status(500)
        .send({ message: 'No seller found. first run /api/users/seed' });
    }
  })
);

tableRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const table = await Table.findById(req.params.id).populate(
      'seller',
      'seller.name seller.logo seller.rating seller.numReviews'
    );
    if (table) {
      res.send(table);
    } else {
      res.status(404).send({ message: 'Table Not Found' });
    }
  })
);

tableRouter.post(
  '/',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const table = new Table({
      name: 'sample name ' + Date.now(),
      seller: req.user._id,
      image: '/images/p1.jpg',
      price: 0,
      category: 'sample category',
      brand: 'sample brand',
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: 'sample description',
    });
    const createdTable = await table.save();
    res.send({ message: 'Table Created', table: createdTable });
  })
);
tableRouter.put(
  '/:id',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const tableId = req.params.id;
    const table = await Table.findById(tableId);
    if (table) {
      table.name = req.body.name;
      table.price = req.body.price;
      table.image = req.body.image;
      table.category = req.body.category;
      table.brand = req.body.brand;
      table.countInStock = req.body.countInStock;
      table.description = req.body.description;
      const updatedTable = await table.save();
      res.send({ message: 'table Updated', table: updatedTable });
    } else {
      res.status(404).send({ message: 'Table Not Found' });
    }
  })
);

tableRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const table = await Table.findById(req.params.id);
    if (table) {
      const deleteTable = await table.remove();
      res.send({ message: 'Table Deleted', table: deleteTable });
    } else {
      res.status(404).send({ message: 'Table Not Found' });
    }
  })
);

tableRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const tableId = req.params.id;
    const table = await Table.findById(tableId);
    if (table) {
      if (table.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'You already submitted a review' });
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      table.reviews.push(review);
      table.numReviews = table.reviews.length;
      table.rating =
        table.reviews.reduce((a, c) => c.rating + a, 0) /
        table.reviews.length;
      const updatedTable = await table.save();
      res.status(201).send({
        message: 'Review Created',
        review: updatedTable.reviews[updatedTable.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: 'Table Not Found' });
    }
  })
);

export default tableRouter;
