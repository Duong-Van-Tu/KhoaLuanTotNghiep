import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listTables } from '../actions/tableActions';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Table from '../components/Table';
import Rating from '../components/Rating';

export default function SellerScreen(props) {
  const sellerId = props.match.params.id;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const tableList = useSelector((state) => state.tableList);
  const {
    loading: loadingTables,
    error: errorTables,
    tables,
  } = tableList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsUser(sellerId));
    dispatch(listTables({ seller: sellerId }));
  }, [dispatch, sellerId]);
  return (
    <div className="row top">
      <div className="col-1">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <ul className="card card-body">
            <li>
              <div className="row start">
                <div className="p-1">
                  <img
                    className="small"
                    src={user.seller.logo}
                    alt={user.seller.name}
                  ></img>
                </div>
                <div className="p-1">
                  <h1>{user.seller.name}</h1>
                </div>
              </div>
            </li>
            <li>
              <Rating
                rating={user.seller.rating}
                numReviews={user.seller.numReviews}
              ></Rating>
            </li>
            <li>
              <a href={`mailto:${user.email}`}>Liên hệ với người bán</a>
            </li>
            <li>{user.seller.description}</li>
          </ul>
        )}
      </div>
      <div className="col-3">
        {loadingTables ? (
          <LoadingBox></LoadingBox>
        ) : errorTables ? (
          <MessageBox variant="danger">{errorTables}</MessageBox>
        ) : (
          <>
            {tables.length === 0 && <MessageBox>Không tìm thấy bảng</MessageBox>}
            <div className="row center">
              {tables.map((table) => (
                <Table key={table._id} table={table}></Table>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
