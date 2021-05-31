import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    bookingItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        table: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'table',
          required: true,
        },
      },
    ],
    bookingTable: {
      //fullName, phoneNumber, date, hour, numberPlace, description
      fullName: { type: String, required: true },
      phoneNumber: { type: String, required: true},
      date: { type: String, required: true },
      hour:{ type: String, required: true},
      numberPlace: { type: String, required: true },
      description:{ type: String, required: true}
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);
const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;



