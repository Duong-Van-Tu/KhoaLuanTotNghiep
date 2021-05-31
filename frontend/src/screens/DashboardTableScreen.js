import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'react-google-charts';
import { summaryBooking } from '../actions/bookingActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function DashboardScreen() {
  const bookingSummary = useSelector((state) => state.bookingSummary);
  const { loading, summary, error } = bookingSummary;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(summaryBooking());
  }, [dispatch]);
  return (
    <div>
      <div className="row">
        <h1>Biểu đồ</h1>
      </div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <ul className="row summary">
            <li>
              <div className="summary-title color1">
                <span>
                  <i className="fa fa-users" />Người dùng
                </span>
              </div>
              <div className="summary-body">{summary.users[0].numUsers}</div>
            </li>
            <li>
              <div className="summary-title color2">
                <span>
                  <i className="fa fa-shopping-cart" />Đơn hàng
                </span>
              </div>
              <div className="summary-body">
                {summary.bookings[0] ? summary.bookings[0].numBookings : 0}
              </div>
            </li>
            <li>
              <div className="summary-title color3">
                <span>
                  <i className="fa fa-money" /> Bán hàng
                </span>
              </div>
              <div className="summary-body">
                $
                {summary.bookings[0]
                  ? summary.bookings[0].totalSales.toFixed(2)
                  : 0}
              </div>
            </li>
          </ul>
          <div>
            <div>
              <h2>Bán hàng</h2>
              {summary.dailyBookings.length === 0 ? (
                <MessageBox>No Sale</MessageBox>
              ) : (
                <Chart
                  width="100%"
                  height="400px"
                  chartType="AreaChart"
                  loader={<div>Đang tải biểu đồ</div>}
                  data={[
                    ['Date', 'Sales'],
                    ...summary.dailyBookings.map((x) => [x._id, x.sales]),
                  ]}
                ></Chart>
              )}
            </div>
          </div>
          <div>
            <h2>Bảng danh mục</h2>
            {summary.tableCategories.length === 0 ? (
              <MessageBox>không có thể loại</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="PieChart"
                loader={<div>Đang tải biểu đồ</div>}
                data={[
                  ['Category', 'Tables'],
                  ...summary.tableCategories.map((x) => [x._id, x.count]),
                ]}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
