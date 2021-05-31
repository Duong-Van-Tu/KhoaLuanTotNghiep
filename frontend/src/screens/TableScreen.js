import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createReview, detailsTable } from '../actions/tableActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { TABLE_REVIEW_CREATE_RESET } from '../constants/tableConstants';

export default function TableScreen(props) {
  const dispatch = useDispatch();
  const tableId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const tableDetails = useSelector((state) => state.tableDetails);
  const { loading, error, table } = tableDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const tableReviewCreate = useSelector((state) => state.tableReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = tableReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: TABLE_REVIEW_CREATE_RESET });
    }
    dispatch(detailsTable(tableId));
  }, [dispatch, tableId, successReviewCreate]);
  const addToCartHandler = () => {
    props.history.push(`/cartTable/${tableId}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(tableId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Trở về trang chủ</Link>
          <div className="row top">
            <div className="col-4">
              <img
                className="large"
                src={table.image}
                alt={table.name}
              ></img>
            </div>
            <div className="col-4">
              <ul>
                <li >
                  <h1>{table.name}</h1>
                </li>
                <li className="description-product">
                  <Rating
                    rating={table.rating}
                    numReviews={table.numReviews}
                  ></Rating>
                </li>
                <li className="description-product">Giá bán : ${table.price}</li>
                <li className="description-product">
                Mô tả
                  <p>{table.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-4">
              <div className="card card-body card-product-seller">
                <ul>
                  <li>
                  Người bán{' '}
                    <h2>
                      <Link to={`/seller/${table.seller._id}`}>
                        {table.seller.seller.name}
                      </Link>
                    </h2>
                    <Rating
                      rating={table.seller.seller.rating}
                      numReviews={table.seller.seller.numReviews}
                    ></Rating>
                  </li>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">${table.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div className ='"col-5 "'>Trạng thái</div>
                      <div  className="col-3" >
                        {table.countInStock > 0 ? (
                          <span className="success">Trong kho</span>
                        ) : (
                          <span className="danger">Không có sẵn</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {table.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div div className="col-5">Số lượng</div>
                          <div  className="col-3">
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(table.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block btn"
                          style={{
                            fontSize: "16px",
                            position: "absolute",
                            bottom: "0",
                            marginLeft: "-1rem",
                          }}
                        >
                         Thêm bàn
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div  className="reviews-client">
            <h2 id="reviews"> 
              Nhận xét
               </h2>
            {table.reviews.length === 0 && (
              <MessageBox>Không có đánh giá</MessageBox>
            )}
            <ul>
              {table.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>Viết nhận xét của khách hàng</h2>
                    </div>
                    <div>
                      <label htmlFor="rating">Xếp hạng</label>
                      <select
                       className="rating-of-client"
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very good</option>
                        <option value="5">5- Excelent</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">Bình luận</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                      Gửi đi
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <div>
                    Xin vui lòng <Link to="/signin">Đăng nhập</Link> viết một bài đánh giá
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
