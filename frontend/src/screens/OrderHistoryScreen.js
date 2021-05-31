import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderHistoryScreen(props) {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return (
    <div>
      <h1>lịch sử đơn hàng</h1>
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
              <th>TOÀN BỘ</th>
              <th>ĐÃ THANH TOÁN</th>
              <th>ĐÃ GIAO HÀNG</th>
              <th>CHỨC NĂNG</th>
            </tr>
          </thead>
          <tbody style={{textAlignLast: 'center'}}>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <button
                    type="button"
                    className="small btn-detail mr-2"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    Chi tiết  
                    <i className="fas fa-info-circle m-2"></i>
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
