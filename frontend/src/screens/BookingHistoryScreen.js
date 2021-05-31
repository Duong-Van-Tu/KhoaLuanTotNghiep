import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listBookingMine } from '../actions/bookingActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function BookingHistoryScreen(props) {
  const bookingMineList = useSelector((state) => state.bookingMineList);
  const { loading, error, bookings } = bookingMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listBookingMine());
  }, [dispatch]);
  return (
    <div>
      <h1>Lịch sử đặt chỗ</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead style={{textAlignLast: 'center'}}>
            <tr>
              <th>ID</th>
              <th>NGÀY</th>
              <th>TỔNG</th>
              <th>ĐÃ THANH TOÁN</th>
              <th>CHỨC NĂNG</th>
            </tr>
          </thead>
          <tbody style={{textAlignLast: 'center'}}>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking._id}</td>
                <td>{booking.createdAt.substring(0, 10)}</td>
                <td>{booking.totalPrice.toFixed(2)}</td>
                <td>{booking.isPaid ? booking.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  <button
                    type="button"
                    className="small btn-primary"
                    onClick={() => {
                      props.history.push(`/booking/${booking._id}`);
                    }}
                  >
                   Chi tiết
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
