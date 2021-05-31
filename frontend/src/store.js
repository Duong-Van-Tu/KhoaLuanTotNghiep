import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartTableReducer } from './reducers/cartTableReducers';
import{cartReducer} from './reducers/cartReducers'

import {
  orderCreateReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMineListReducer,
  orderPayReducer,
  orderSummaryReducer,
} from './reducers/orderReducers';
import {
  productCategoryListReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewCreateReducer,
  productUpdateReducer,
} from './reducers/productReducers';

import {
  bookingCreateReducer,
  bookingDeleteReducer,
  bookingDeliverReducer,
  bookingDetailsReducer,
  bookingListReducer,
  bookingMineListReducer,
  bookingPayReducer,
  bookingSummaryReducer,
} from './reducers/bookingReducers';
import {
  tableCategoryListReducer,
  tableCreateReducer,
  tableDeleteReducer,
  tableDetailsReducer,
  tableListReducer,
  tableReviewCreateReducer,
  tableUpdateReducer,
} from './reducers/tableReducers';
import {
  userAddressMapReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
  userSigninReducer,
  userTopSellerListReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from './reducers/userReducers';

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: 'PayPal',
  },
  cartTable: {
    cartTableItems: localStorage.getItem('cartTableItems')
      ? JSON.parse(localStorage.getItem('cartTableItems'))
      : [],
    bookingTable: localStorage.getItem('bookingTable')
      ? JSON.parse(localStorage.getItem('bookingTable'))
      : {},
    paymentMethod: 'PayPal',
  }
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  tableList: tableListReducer,
  tableDetails: tableDetailsReducer,
  cart: cartReducer,
  cartTable: cartTableReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  bookingCreate: bookingCreateReducer,
  bookingDetails: bookingDetailsReducer,
  bookingPay: bookingPayReducer,
  bookingMineList: bookingMineListReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  tableCreate: tableCreateReducer,
  tableUpdate: tableUpdateReducer,
  tableDelete: tableDeleteReducer,
  bookingList: bookingListReducer,
  bookingDelete: bookingDeleteReducer,
  bookingDeliver: bookingDeliverReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userTopSellersList: userTopSellerListReducer,
  productCategoryList: productCategoryListReducer,
  productReviewCreate: productReviewCreateReducer,
  tableCategoryList: tableCategoryListReducer,
  tableReviewCreate: tableReviewCreateReducer,
  userAddressMap: userAddressMapReducer,
  bookingSummary: bookingSummaryReducer,
  orderSummary: orderSummaryReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
