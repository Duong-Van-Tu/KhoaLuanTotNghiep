import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBooking, listBookings } from '../actions/bookingActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { BOOKING_DELETE_RESET } from '../constants/bookingConstants';

export default function BookingListScreen(props) {
  const sellerMode = props.match.path.indexOf('/seller') >= 0;
  const bookingList = useSelector((state) => state.bookingList);
  const { loading, error, bookings } = bookingList;
  const bookingDelete = useSelector((state) => state.bookingDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = bookingDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: BOOKING_DELETE_RESET });
    dispatch(listBookings({ seller: sellerMode ? userInfo._id : '' }));
  }, [dispatch, sellerMode, successDelete, userInfo._id]);
  const deleteHandler = (booking) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteBooking(booking._id));
    }
  };
  return (
    <div>
      <h1>Đặt bàn</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>KHÁCH HÀNG</th>
              <th>NGÀY</th>
              <th>TỔNG</th>
              <th>ĐÃ THANH TOÁN</th>
              <th>CHỨC NĂNG</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking._id}</td>
                <td>{booking.bookingTable.fullName}</td>
                <td>{booking.createdAt.substring(0, 10)}</td>
                <td>{booking.totalPrice.toFixed(2)}</td>
                <td>{booking.isPaid ? booking.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  <button
                    type="button"
                    className="small btn-detail"
                    onClick={() => {
                      props.history.push(`/booking/${booking._id}`);
                    }}
                  >
                    Chi tiết
                    <i className="fas fa-info-circle m-2"></i>
                  </button>
                  <button
                    type="button"
                    className="small btn-delete"
                    onClick={() => deleteHandler(booking)}
                  >
                    Xóa
                    <i className="far fa-trash-alt m-2"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
