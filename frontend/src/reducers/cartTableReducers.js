import {
  CART_ADD_TABLE_ITEM,
  CART_ADD_ITEM_TABLE_FAIL,
  CART_TABLE_EMPTY,
  CART_REMOVE_TABLE_ITEM,
  CART_SAVE_TABLE_PAYMENT_METHOD,
  CART_SAVE_BOOKING_TABLE,
} from '../constants/cartTableConstants';

export const cartTableReducer = (state = { cartTableItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_TABLE_ITEM:
      const item = action.payload;
      const existItem = state.cartTableItems.find((x) => x.table === item.table);
      if (existItem) {
        return {
          ...state,
          error: '',
          cartTableItems: state.cartTableItems.map((x) =>
            x.table === existItem.table ? item : x
          ),
        };
      } else {
        return { ...state, error: '', cartTableItems: [...state.cartTableItems, item] };
      }
    case CART_REMOVE_TABLE_ITEM:
      return {
        ...state,
        error: '',
        cartTableItems: state.cartTableItems.filter((x) => x.table !== action.payload),
      };
    case CART_SAVE_BOOKING_TABLE:
      return { ...state, bookingTable: action.payload };
    case CART_SAVE_TABLE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    case CART_ADD_ITEM_TABLE_FAIL:
      return { ...state, error: action.payload };
    case CART_TABLE_EMPTY:
      return { ...state, error: '', cartTableItems: [] };
    default:
      return state;
  }
};
