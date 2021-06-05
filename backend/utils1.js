import jwt from 'jsonwebtoken';
import mg from 'mailgun-js';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret',
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};
export const isSeller = (req, res, next) => {
  if (req.user && req.user.isSeller) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Seller Token' });
  }
};
export const isSellerOrAdmin = (req, res, next) => {
  if (req.user && (req.user.isSeller || req.user.isAdmin)) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin/Seller Token' });
  }
};

export const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMIAN,
  });

export const payBookingEmailTemplate = (booking) => {
  return `<h1>Thanks for shopping with us</h1>
  <p>
  Hi ${booking.user.name},</p>
  <p>We have finished processing your booking.</p>
  <h2>[Booking ${booking._id}] (${booking.createdAt.toString().substring(0, 10)})</h2>
  <table>
  <thead>
  <tr>
  <td><strong>Table</strong></td>
  <td><strong>Quantity</strong></td>
  <td><strong align="right">Price</strong></td>
  </thead>
  <tbody>
  ${booking.bookingItems
    .map(
      (item) => `
    <tr>
    <td>${item.name}</td>
    <td align="center">${item.qty}</td>
    <td align="right"> $${item.price.toFixed(2)}</td>
    </tr>
  `
    )
    .join('\n')}
  </tbody>
  <tfoot>
  <tr>
  <td colspan="2">Items Price:</td>
  <td align="right"> $${booking.itemsPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2">Tax Price:</td>
  <td align="right"> $${booking.taxPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2"><strong>Total Price:</strong></td>
  <td align="right"><strong> $${booking.totalPrice.toFixed(2)}</strong></td>
  </tr>
  <tr>
  <td colspan="2">Payment Method:</td>
  <td align="right">${booking.paymentMethod}</td>
  </tr>
  </table>
  <h2>ĐẶT BÀN</h2>
  <p>
  ${booking.bookingTable.fullName},<br/>
  ${booking.bookingTable.phoneNumber},<br/>
  ${booking.bookingTable.date},<br/>
  ${booking.bookingTable.hour},<br/>
  ${booking.bookingTable.numberPlace}<br/>
  ${booking.bookingTable.description}<br/>
  </p>
  <hr/>
  <p>
  Thanks for booking with us.
  </p>
  `;
};
