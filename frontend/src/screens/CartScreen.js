import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';
import '../scss/bookTable.css'
import "../scss/cardShopping.css";
import hinh1 from '../scss/images/gif4.gif'


export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };
  return (
    <div className="row top h-100">
      <div className="col-8 table-content">
        <h1>Giỏ hàng</h1>
        <div className ='table-tab'>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {cartItems.length === 0 ? (
          <div>
              <MessageBox>
          <br></br> <Link to="/" className = " link-transform" 
            // style ={{ position: 'absolute', marginLeft:'100px',display: 'inline'}}
            style ={{ position: 'absolute', marginLeft:'210px',display: 'inline',  
            top: '209px'}}
            >Đặt món ngay</Link>
          </MessageBox>
          <img src ={hinh1} className ='w-200 img-card-table-responsive'
          style ={{
          borderRadius: '20%',
          width:'800px',
         
     
        }}
        />
      </div>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div className='col-6 '>
                    <img
                      src={item.image}
                      alt={item.name}
                      className=""
                      style={{
                        width :'100px',
                        float:'left',
                        // position: 'absolute',
                        // left : '-136%',
                        // top : '-100px'
                      }}
                    ></img>
                  </div >
                  <div className="col-6 " style = {{    display: '-webkit-inline-box'}}>
                    <div className="min-30 ">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div className="">
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="">
                      <div
                          className=" col-6 mx-5"
                          // style={{
                          //   fontSize: "20px",
                          //   fontStyle: "italic",
                          //   color: "#007bff",
                          //   fontWeight: "500",
                          // }}
                        >
                           {" "}
                           Giá bán
                      
                      </div>
                      <div
                        className="item-price-style "
                  
                      >
                        ${item.price}
                      </div>
                    </div>
                    <div>
                      <button
                        className=" btn btn-delete mx-5"
                        style={{
                          float: "right",
                          fontSize: "16px",
                        }}
                        type="button "
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                       Xóa
                        <i className="far fa-trash-alt m-2"></i>
                      </button>
                    </div>
                  </div>
                  
                </div>
              </li>
            ))}
          </ul>
        )}

  
        </div>
        
      </div>
      <div className="col-1 ">
        <div className="card card-body card-responsive-table" style ={{top :'80px'}}>
          <ul>
            <li>
              <h2>
              Tổng phụ ({cartItems.reduce((a, c) => a + c.qty, 0)} mặt hàng) : $
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Tiến hành kiểm tra
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
