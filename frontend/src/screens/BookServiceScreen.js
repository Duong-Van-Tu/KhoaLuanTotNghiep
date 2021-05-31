import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link,useParams } from "react-router-dom";
import "../scss/bookService.css";
import { CalendarComponent } from "@syncfusion/ej2-react-calendars";
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Table from '../components/Table';
import { listTables } from '../actions/tableActions';
import { listTopSellers } from '../actions/userActions';



export default function BookServiceScreen(props) {

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
    return `/BookServiceScreen/category/${filterCategory}/pageNumber/${filterPage}`;
  };
  
  const dispatchBookTable = useDispatch();

 
  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  useEffect(() => {
    dispatchBookTable(listTables({}));
    dispatchBookTable(listTopSellers());
  }, [dispatchBookTable]);
  // const startDate = new Date(new Date().getFullYear(), new Date().getMonth());
  // const btn_Books = document.querySelector("#button-book");
  // const btn_Checkout = document.querySelector("#btn_checkout");
  // const container = document.querySelector(".step-container-book");

  // const container_confirm = document.querySelector(".detail-book-step2");
  // const endDate = new Date(new Date().getFullYear(), new Date().getMonth(), 26);
  return (
    <div className="header">
      <div className="content-header-book">
        <p>Dịch vụ đặt bàn !!!</p>
        <img
          src="https://i.pinimg.com/564x/78/46/3b/78463bbf849d67642f95c0303c4627cf.jpg"
          className="image-book-1"
          alt=""
        />
        <img
          src="https://i.pinimg.com/564x/87/5b/c5/875bc5e669b26738025f4e452a1e156c.jpg"
          className="image-book-2"
          alt=""
        />
        <img
          src="https://i.pinimg.com/564x/3a/22/77/3a227738dd930f19fec8f31b21bb2ff6.jpg"
          className="image-book-3"
          alt=""
        />
      </div>
      <div className="body-book">
        <div className="top-content-book"></div>
        <div className="mid-content-book ">
          <div className="step-container-book">

          </div>

    <div className= 'mt-5'>
     
     {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {tables.length === 0 && <MessageBox>không tìm thấy bàn</MessageBox>}
          <div className="row center">
            {tables.map((table) => (
              <Table key={table._id} table={table}></Table>
            ))}
          </div>
        </>
      )}
    </div>
    <div className="row center pagination">
                
                {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === page ? 'active' : ''}
                key={x + 1}
                to={getFilterUrl({page : x + 1})}
              >
                {x + 1}
              </Link>
            ))}
              </div>
          <div className="specialities"></div>
        </div>
      </div>
    </div>
  );
}
