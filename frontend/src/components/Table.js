import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import '../scss/cardShopping.css'

export default function Table(props) {
  const { table } = props;
  return (
    <div key={table._id} className="card card-table-res">
      <Link to={`/table/${table._id}`}>
        <img className="medium" src={table.image} alt={table.name} />
      </Link>
      <div className="card-body">
        <Link to={`/table/${table._id}`}>
          <h2>{table.name}</h2>
        </Link>
        <Rating
          rating={table.rating}
          numReviews={table.numReviews}
        ></Rating>
        <div className="row">
          <div className="price">${table.price}</div>
          <div>
            <Link to={`/seller/${table.seller._id}`}>
              {table.seller.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
