const {
  TABLE_LIST_REQUEST,
  TABLE_LIST_SUCCESS,
  TABLE_LIST_FAIL,
  TABLE_DETAILS_REQUEST,
  TABLE_DETAILS_SUCCESS,
  TABLE_DETAILS_FAIL,
  TABLE_CREATE_REQUEST,
  TABLE_CREATE_SUCCESS,
  TABLE_CREATE_FAIL,
  TABLE_CREATE_RESET,
  TABLE_UPDATE_REQUEST,
  TABLE_UPDATE_SUCCESS,
  TABLE_UPDATE_FAIL,
  TABLE_UPDATE_RESET,
  TABLE_DELETE_REQUEST,
  TABLE_DELETE_SUCCESS,
  TABLE_DELETE_FAIL,
  TABLE_DELETE_RESET,
  TABLE_CATEGORY_LIST_REQUEST,
  TABLE_CATEGORY_LIST_SUCCESS,
  TABLE_CATEGORY_LIST_FAIL,
  TABLE_REVIEW_CREATE_REQUEST,
  TABLE_REVIEW_CREATE_SUCCESS,
  TABLE_REVIEW_CREATE_FAIL,
  TABLE_REVIEW_CREATE_RESET,
} = require('../constants/tableConstants');

export const tableListReducer = (
  state = { loading: true, tables: [] },
  action
) => {
  switch (action.type) {
    case TABLE_LIST_REQUEST:
      return { loading: true };
    case TABLE_LIST_SUCCESS:
      return {
        loading: false,
        tables: action.payload.tables,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case TABLE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const tableCategoryListReducer = (
  state = { loading: true, tables: [] },
  action
) => {
  switch (action.type) {
    case TABLE_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case TABLE_CATEGORY_LIST_SUCCESS:
      return { loading: false, categoriesTable: action.payload };
    case TABLE_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const tableDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case TABLE_DETAILS_REQUEST:
      return { loading: true };
    case TABLE_DETAILS_SUCCESS:
      return { loading: false, table: action.payload };
    case TABLE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const tableCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TABLE_CREATE_REQUEST:
      return { loading: true };
    case TABLE_CREATE_SUCCESS:
      return { loading: false, success: true, table: action.payload };
    case TABLE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TABLE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const tableUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case TABLE_UPDATE_REQUEST:
      return { loading: true };
    case TABLE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case TABLE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TABLE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const tableDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TABLE_DELETE_REQUEST:
      return { loading: true };
    case TABLE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TABLE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case TABLE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
export const tableReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TABLE_REVIEW_CREATE_REQUEST:
      return { loading: true };
    case TABLE_REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true, review: action.payload };
    case TABLE_REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TABLE_REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
