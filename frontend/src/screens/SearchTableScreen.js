import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listTables } from '../actions/tableActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Table from '../components/Table';
import Rating from '../components/Rating';
import { prices, ratings } from '../utils';

export default function SearchScreen(props) {
  const {
    name = 'all',
    category = 'all',
    min = 0,
    max = 0,
    rating = 0,
    booking = 'newest',
    pageNumber = 1,
  } = useParams();
  const dispatch = useDispatch();
  const tableList = useSelector((state) => state.tableList);
  const { loading, error, tables, page, pages } = tableList;

  const tableCategoryList = useSelector((state) => state.tableCategoryList);
  const {
    loading: loadingCategoriesTable,
    error: errorCategoriesTable,
    categoriesTable,
  } = tableCategoryList;
  useEffect(() => {
    dispatch(
      listTables({
        pageNumber,
        name: name !== 'all' ? name : '',
        category: category !== 'all' ? category : '',
        min,
        max,
        rating,
        booking,
      })
    );
  }, [category, dispatch, max, min, name, booking, rating, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortBooking = filter.booking || booking;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/booking/${sortBooking}/pageNumber/${filterPage}`;
  };
  return (
    <div>
      <div className="row">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{tables.length} K???t qu??? :</div>
        )}
        <div>
        S???p x???p theo{' '}
          <select
            value={booking}
            onChange={(e) => {
              props.history.push(getFilterUrl({ booking: e.target.value }));
            }}
          >
            <option value="newest">H??ng m???i nh???t</option>
            <option value="lowest">Gi??: Th???p ?????n cao</option>
            <option value="highest">Gi??: t??? cao ?????n th???p</option>
            <option value="toprated">Trung b??nh Ph???n h???i kh??ch h??ng</option>
          </select>
        </div>
      </div>
      <div className="row top">
        <div className="col-1">
          <h3>Th??? lo???i</h3>
          <div>
            {loadingCategoriesTable ? (
              <LoadingBox></LoadingBox>
            ) : errorCategoriesTable ? (
              <MessageBox variant="danger">{errorCategoriesTable}</MessageBox>
            ) : (
              <ul>
                <li>
                  <Link
                    className={'all' === category ? 'active' : ''}
                    to={getFilterUrl({ category: 'all' })}
                  >
                 B???t k??
                  </Link>
                </li>
                {categoriesTable.map((c) => (
                  <li key={c}>
                    <Link
                      className={c === category ? 'active' : ''}
                      to={getFilterUrl({ category: c })}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3> Gi?? b??n</h3>
            <ul>
              {prices.map((p) => (
                <li key={p.name}>
                  <Link
                    to={getFilterUrl({ min: p.min, max: p.max })}
                    className={
                      `${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''
                    }
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Trung b??nh ????nh gi?? c???a kh??ch h??ng</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    to={getFilterUrl({ rating: r.rating })}
                    className={`${r.rating}` === `${rating}` ? 'active' : ''}
                  >
                    <Rating caption={' & up'} rating={r.rating}></Rating>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {tables.length === 0 && (
                <MessageBox>Kh??ng t??m th???y b??n</MessageBox>
              )}
              <div className="row center">
                {tables.map((table) => (
                  <Table key={table._id} table={table}></Table>
                ))}
              </div>
              <div className="row center pagination ">
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    className={x + 1 === page ? 'active' : ''}
                    key={x + 1}
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
