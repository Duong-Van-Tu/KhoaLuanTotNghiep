import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createBooking } from '../actions/bookingActions';
import CheckoutSteps from '../components/CheckoutTableSteps';
import { BOOKING_CREATE_RESET } from '../constants/bookingConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import "../scss/cardOderScreen.css";   


export default function PlaceBookingScreen(props) {
  const cartTable = useSelector((state) => state.cartTable);
  if (!cartTable.paymentMethod) {
    props.history.push('/paymentTable');
  }
  const bookingCreate = useSelector((state) => state.bookingCreate);
  const { loading, success, error, booking } = bookingCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cartTable.itemsPrice = toPrice(
    cartTable.cartTableItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cartTable.taxPrice = toPrice(0.15 * cartTable.itemsPrice);
  cartTable.totalPrice = cartTable.itemsPrice + cartTable.taxPrice;
  const dispatch = useDispatch();
  const placeBookingHandler = () => {
    dispatch(createBooking({ ...cartTable, bookingItems: cartTable.cartTableItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/booking/${booking._id}`);
      dispatch({ type: BOOKING_CREATE_RESET });
    }
  }, [dispatch, booking, props.history, success]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body card-Oder-Screen"  style ={{width :'80%'}}>
                <h2>Bàn đặt chỗ</h2>
                <p>
                <strong>Tên:</strong> {cartTable.bookingTable.fullName} <br />
                  <strong>Số điện thoại: </strong> {cartTable.bookingTable.phoneNumber} <br />
                  <strong>Giờ: </strong> {cartTable.bookingTable.hour} <br />
                  <strong>Ngày: </strong> {cartTable.bookingTable.date} <br />
                  <strong>Địa chỉ: </strong> {cartTable.bookingTable.numberPlace} <br />
                  <strong>Mô tả: </strong> {cartTable.bookingTable.description} <br />
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body card-Oder-Screen"  style ={{width :'80%'}}>
                <h2>Thanh toán</h2>
                <p>
                  <strong>Phương pháp:</strong> {cartTable.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body card-Oder-Screen"  style ={{width :'80%'}}>
                <h2>Đặt trước các mặt hàng</h2>
                <ul>
                  {cartTable.cartTableItems.map((item) => (
                    <li key={item.table}>
                      <div className="row">
                        <div className = 'col'>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                            style = {{width :'100px'}}
                          ></img>
                        </div>
                        <div className="min-30 col" >
                          <Link to={`/table/${item.table}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div className='col'>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body card-Oder-Screen"  style ={{width :'80%'}}>
            <ul>

                <h2><b>Thanh toán đặt bàn</b></h2>
              
              <li>
                <div className="row">
                  <div>Mặt hàng</div>
                  <div>${cartTable.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Thuế</div>
                  <div>${cartTable.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Tổng số đặt trước</strong>
                  </div>
                  <div>
                    <strong>${cartTable.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeBookingHandler}
                  className="primary block"
                  disabled={cartTable.cartTableItems.length === 0}
                >
                  Đặt chỗ
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
