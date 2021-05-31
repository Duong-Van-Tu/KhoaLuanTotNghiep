import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import "../scss/cardOderScreen.css";   

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push('/payment');
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10); // trên 100$ free ship
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-9">
          <ul id ='nav-card'>
            <li  className="col-4" style={{ display: "inline-block" }}>
              <div  className="card card-body card-Oder-Screen card-1200 "  style ={{width :'200%'}}>
                <h2>Đang chuyển hàng</h2>
                <p>
                  <strong>Tên:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Địa chỉ: </strong> {cart.shippingAddress.address},
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                  ,{cart.shippingAddress.country}
                </p>
              </div>
            </li>
            <li className="col-4 "
            //  style={{ display: "inline-block" }
             >
              <div className="card card-body card-Oder-Screen card-1200 "  style ={{width :'200%'}}>
                <h2>Thanh toán</h2>
                <p>
                  <strong>Phương pháp:</strong> {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li  className="col-4" style={{ display: "inline-block" }}  >
              <div className="card card-body card-Oder-Screen card-1200 " style ={{width :'200%'}}>
                <h2>Đặt hàng các mặt hàng</h2>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row" style={{ textAlign: "center" }}>
                        <div className='col'>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small" 
                            style ={{width: '100px  '}}
                          ></img>
                        </div>
                        <div className="min-30 col">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div className="style-price col ">
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
        <div className="col-3">
          <div className="card nav-car card-Oder-Screen card-Oder-Screen-responsive "  style={{ marginTop: "2rem" }}>
          <h2><b>Thanh Toán Đơn Hàng</b></h2>
            <ul>
              <li className="statistical-content">
                <div className="row">
                  <div>Mặt hàng</div>
                  <div>${cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li className="statistical-content">
                <div className="row">
                  <div>Phí giao hàng</div>
                  <div>${cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li className="statistical-content">
                <div className="row">
                  <div>Thuế</div>
                  <div>${cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li className="statistical-content">
                <div className="row">
                  <div>
                    <strong> Tổng đơn đặt hàng</strong>
                  </div>
                  <div>
                    <strong  style={{ color: "#ffbd0d" }}>${cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block btn-order"
                  disabled={cart.cartItems.length === 0}
                >
                 Đặt hàng
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
