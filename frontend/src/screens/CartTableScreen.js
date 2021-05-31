import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartTableActions';
import MessageBox from '../components/MessageBox';
import hinh1 from '../scss/images/gif4.gif'
import '../scss/bookTable.css'
import "../scss/cardShopping.css";


export default function CartTableScreen(props) {
  const tableId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  const cart = useSelector((state) => state.cartTable);
  const { cartTableItems, error } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (tableId) {
      dispatch(addToCart(tableId, qty));
    }
  }, [dispatch, tableId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=bookingTable');
  };
  return (
    <div className=" row top h-100" 
    // style ={{ backgroundColor : 'white', paddingBottom:'100px', textAlign:'center'}}
    >
      <div className="col-8 table-content">
        <div>
          <h1>Đặt bàn</h1>
        </div>
        <div className ='table-tab'>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {cartTableItems.length === 0 ? (
          
          <div>
            <MessageBox>
 
          <Link to="/BookServiceScreen" className = " link-transform mt-5" 
            style ={{ position: 'absolute', marginLeft:'210px',display: 'inline',  
            top: '209px'}}

            >
          Đặt bàn </Link>
         
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
            {cartTableItems.map((item) => (
              <li key={item.table}>
                <div className="row" style ={{float : 'left'}}>
                  <div className='col-6 content-shop-card'>
                      <div>
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
                      </div>
                      <div className="col-6 "  style={{ display: '-webkit-inline-box'}}>
                      <div className="min-30">
                        <Link to={`/table/${item.table}`}>{item.name}</Link>
                      </div>
                      <div>
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.table, Number(e.target.value))
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
                      <div>
                      <div
                          className=" col-6 mx-5"
                          style={{
                          //   fontSize: "20px",
                          //   fontStyle: "italic",
                          //   color: "#007bff",
                          //   fontWeight: "500",
                           }}
                        >
                           {" "}
                           Giá bán
                      
                      </div>
                         <div className="item-price-style ">${item.price}</div>
                      </div>
                      <div>
                        <button
                          className=" btn btn-delete mx-5"
                          type="button"
                          onClick={() => removeFromCartHandler(item.table)}
                          style={{
                            float: "right",
                            fontSize: "16px",
                          }}
                       >
                         Xóa
                          <i className="far fa-trash-alt m-2"></i>
                        </button>
                      </div>
                    </div>
                    
                  </div>
                 
                </div>
              </li>
            ))}
          </ul>
        )}
        </div>
       
      </div>
      
      <div className="col-1 table-responsive">
        <div className="card card-body card-responsive-table" style ={{top :'80px'}}>
          <ul>
            <li>
              <h2>
              Tổng ({cartTableItems.reduce((a, c) => a + c.qty, 0)} mặt hàng) : $
                {cartTableItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartTableItems.length === 0}
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
