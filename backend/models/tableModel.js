import mongoose from 'mongoose';
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const tableSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);
const Table = mongoose.model('Table', tableSchema);

export default Table;




// import mongoose from 'mongoose';
// const tableSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, unique: true },
//     image: { type: String, required: true },
//     NumberPlace: { type: String, required: true },
//     type:{type: String, required: true},
//     description: { type: String, required: true},
//     created_at: { type: Date,  required: true}
//   },
//   {
//     timestamps: true,
//   }
// );
// const Table = mongoose.model('Table', tableSchema);

// export default Table;
