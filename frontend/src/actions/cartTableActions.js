import Axios from 'axios';
import {
  CART_ADD_TABLE_ITEM,
  CART_REMOVE_TABLE_ITEM,
  CART_SAVE_BOOKING_TABLE,
  CART_SAVE_TABLE_PAYMENT_METHOD,
  CART_ADD_ITEM_TABLE_FAIL,
} from '../constants/cartTableConstants';

export const addToCart = (tableId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/tables/${tableId}`);
  const {
    cartTable: { cartTableItems },
  } = getState();
  if (cartTableItems.length > 0 && data.seller._id !== cartTableItems[0].seller._id) {
    dispatch({
      type: CART_ADD_ITEM_TABLE_FAIL,
      payload: `Can't Add To Table Cart. Buy only from ${cartTableItems[0].seller.seller.name} in this booking`,
    });
  } else {
    dispatch({
      type: CART_ADD_TABLE_ITEM,
      payload: {
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        table: data._id,
        seller: data.seller,
        qty,
      },
    });
    localStorage.setItem(
      'cartTableItems',
      JSON.stringify(getState().cartTable.cartTableItems)
    );
  }
};

export const removeFromCart = (tableId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_TABLE_ITEM, payload: tableId });
  localStorage.setItem('cartTableItems', JSON.stringify(getState().cartTable.cartTableItems));
};

export const saveBookingTable = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_BOOKING_TABLE, payload: data });
  localStorage.setItem('bookingTable', JSON.stringify(data));
};
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_TABLE_PAYMENT_METHOD, payload: data });
};
