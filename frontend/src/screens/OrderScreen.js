import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../constants/orderConstants';
import "../scss/cardOderScreen.css";

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  // const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "0.01",
          },
        },
      ],
    });
  }
  const onApprove = (data, actions) => {
    return actions.order.capture();
  }

  function confirmSuccess (){
    if(order.isPaid === true){
       notify();
      
    }else {
      not_notify()
    }

  }
  const notify = () => toast.success("Thanh toán thành công!");
  const not_notify = () => toast.error("Thanh toán chưa thành công")

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;

     // script.src = `https://www.paypal.com/sdk/js?client-id=ATpB_qUd6EOVzvep_ojzwzy06Lni5oinBvFgg-hOqLtkCz9tdPwRj4rgLOrlmJo-PlESwQwIDzishx5J`
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, sdkReady, successPay, successDeliver, order]);



  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Đặt hàng {order._id}</h1>
      <div className="row top">
        <div className="content-body-responsive">
          <ul className ='' style = {{width :'60%'}}>
            <li className="col" 
            // style={{ display: "inline-block" }}
            >
              <div className="card card-body card-body-new  ">
                <h2 className = 'header-content-pay'>Đang chuyển hàng</h2>
                <p>
                  <strong>Tên:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Địa chỉ: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Được giao lúc {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Chưa được giao</MessageBox>
                )}
              </div>
            </li>
            <li className="col "
            //  style={{ display: "inline-block" }}
             >
              <div className="card card-body card-body-new ">
                <h2 className = 'header-content-pay'>Thanh toán</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>

                {order.isPaid ? (
                  <div >
                    {confirmSuccess()}
                   <ToastContainer />
                  <MessageBox variant="success">
                    Thanh toán tại {order.paidAt}
                  </MessageBox>
                  </div>
                   
                ) : (
                  <MessageBox variant="danger">Chưa thanh toán</MessageBox>
                )}
              </div>
            </li>
            <li  className="col " 
            // style={{ display: "inline-block" }}
            >
              <div className="card card-body card-body-new ">
                <h2 className = 'header-content-pay' >Đặt các mặt hàng</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div className = 'col'>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                            style = {{width:'100px'}}
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
        <div className="">
          <div 
           className="card nav-car card-Oder-Screen card-Oder-Screen-place-responsive "
           style={{ height: "500px" }}
          >
            <ul className =''>
              <li>
                <h2><b>Thanh Toán Đơn Hàng</b></h2>
              </li>
              <li className = 'statistical-content'>
                <div className="row">
                  <div>Mặt hàng</div>
                  <div>${order.itemsPrice.toFixed(2)}</div>
                </div>PayPal
              </li>
              <li className="statistical-content">
                <div className="row">
                  <div>Đang chuyển hàng</div>
                  <div>${order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li className="statistical-content">
                <div className="row">
                  <div>Thuế</div>
                  <div>${order.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li className="statistical-content">
                <div className="row">
                  <div>
                    <strong>Tổng đơn đặt hàng</strong>
                  </div>
                  <div>
                    <strong>${order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              {!order.isPaid && (
                <li className="statistical-content">
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}

                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    
                    </>
                  )}
                </li>
              )}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <li>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="primary block"
                    onClick={deliverHandler}
                  >
                    Giao hàng
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
