import Axios from 'axios';
import {
  TABLE_CREATE_FAIL,
  TABLE_CREATE_REQUEST,
  TABLE_CREATE_SUCCESS,
  TABLE_DETAILS_FAIL,
  TABLE_DETAILS_REQUEST,
  TABLE_DETAILS_SUCCESS,
  TABLE_LIST_FAIL,
  TABLE_LIST_REQUEST,
  TABLE_LIST_SUCCESS,
  TABLE_UPDATE_REQUEST,
  TABLE_UPDATE_SUCCESS,
  TABLE_UPDATE_FAIL,
  TABLE_DELETE_REQUEST,
  TABLE_DELETE_FAIL,
  TABLE_DELETE_SUCCESS,
  TABLE_CATEGORY_LIST_SUCCESS,
  TABLE_CATEGORY_LIST_REQUEST,
  TABLE_CATEGORY_LIST_FAIL,
  TABLE_REVIEW_CREATE_REQUEST,
  TABLE_REVIEW_CREATE_SUCCESS,
  TABLE_REVIEW_CREATE_FAIL,
} from '../constants/tableConstants';

export const listTables = ({
  pageNumber = '',
  seller = '',
  name = '',
  category = '',
  booking = '',
  min = 0,
  max = 0,
  rating = 0,
}) => async (dispatch) => {
  dispatch({
    type: TABLE_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `/api/tables?pageNumber=${pageNumber}&seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&booking=${booking}`
    );
    dispatch({ type: TABLE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TABLE_LIST_FAIL, payload: error.message });
  }
};

export const listTableCategories = () => async (dispatch) => {
  dispatch({
    type: TABLE_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/tables/categoriesTable`);
    dispatch({ type: TABLE_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TABLE_CATEGORY_LIST_FAIL, payload: error.message });
  }
};

export const detailsTable = (tableId) => async (dispatch) => {
  dispatch({ type: TABLE_DETAILS_REQUEST, payload: tableId });
  try {
    const { data } = await Axios.get(`/api/tables/${tableId}`);
    dispatch({ type: TABLE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TABLE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createTable = () => async (dispatch, getState) => {
  dispatch({ type: TABLE_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      '/api/tables',
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: TABLE_CREATE_SUCCESS,
      payload: data.table,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TABLE_CREATE_FAIL, payload: message });
  }
};
export const updateTable = (table) => async (dispatch, getState) => {
  dispatch({ type: TABLE_UPDATE_REQUEST, payload: table });
  const {
    userSignin: { userInfo},
  } = getState();
  try {
    const { data } = await Axios.put(`/api/tables/${table._id}`, table, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TABLE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TABLE_UPDATE_FAIL, error: message });
  }
};
export const deleteTable = (tableId) => async (dispatch, getState) => {
  dispatch({ type: TABLE_DELETE_REQUEST, payload: tableId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/tables/${tableId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TABLE_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TABLE_DELETE_FAIL, payload: message });
  }
};
export const createReview = (tableId, review) => async (
  dispatch,
  getState
) => {
  dispatch({ type: TABLE_REVIEW_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `/api/tables/${tableId}/reviews`,
      review,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: TABLE_REVIEW_CREATE_SUCCESS,
      payload: data.review,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TABLE_REVIEW_CREATE_FAIL, payload: message });
  }
};
