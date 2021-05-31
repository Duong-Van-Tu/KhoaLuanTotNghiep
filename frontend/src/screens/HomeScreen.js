import React, { useEffect, useState } from 'react';
import jQuery from "jquery";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import { Link } from 'react-router-dom';
import ReactPlayer from "react-player";
import "../scss/homeScreen.css";
import "./BookServiceScreen.js";
import { CalendarComponent } from "@syncfusion/ej2-react-calendars";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import thitbo from '../scss/images/Delivery.png'
import boomxidau from '../scss/images/boxidau.jpeg'
import bocuonhanh from '../scss/images/BoCuonHanh.jpg'
import nemran from '../scss/images/nemran.jpg'
import nuocrauma from '../scss/images/nuocRauMa.jpg'
import cocktailChanh from '../scss/images/cocktailChanh.jpg'
import blueOceanCocktail from '../scss/images/blueOceanCocktail.jpg'

import drink from '../scss/images/nuocuong.png'
import fastFood from '../scss/images/fastfood.png'
import MapScreen from "./MapScreen";
import monan from '../scss/images/monan.png'
import $ from "jquery";
import {
  InfoWindow,
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InforWindown
} from "react-google-maps";
import AOS from "aos";
import logo_video from "../scss/images/logo_video.mp4";
import Geocode from "react-geocode";
import anh1 from '../scss/images/drink-1.jpg'
import anh2 from '../scss/images/coffe1.jpg'
import anh3 from '../scss/images/pizza.jpg'
import anh4 from '../scss/images/monAnTruyenThongVietNam_3.jpg'
import mapsIcon from '../scss/images/maps.png'
import { Descriptions } from 'antd';

Geocode.setApiKey("AIzaSyDVGjDTneZNSjh91mqVpqVmEshIYnxZhnI");

export default function HomeScreen() {
  AOS.init({
    offset: 400,
    duration: 1000,
  });

   //google map

   const [selectorRes , setSelectorRes] = useState(null)
   React.state = {
    address: "",
    city: "",
    area: "",
    state: "",
    zoom: 15,
    height: 400,
    mapPosition: {
      lat: 0,
      lng: 0,
    },
    markerPosition: {
      lat: 0,
      lng: 0,
    },
  };

const  getCity= (addressArray) => {
    let city = ''
    for(let index = 0; index < addressArray.length; index++){
      if(addressArray[index].types[0] && 'administrative_area_level_2' === addressArray[index].types[0]){
        city = addressArray[index].long_name;
        return city;
      }
    }
     
  } 

const getArea= (addressArray) => {
  let area ='';
  for(let index = 0; index < addressArray.length; index++) {
    if(addressArray[index].type[0]) {
      for(let j= 0; j < addressArray.length; j++ ){
        if('sublocality_level_1' ===  addressArray[index].types[j] || 'locality' === addressArray[index].types[j]) {
          area = addressArray[index].long_name;
          return area
        }
      }
    }
  }
}  

const getState = (addressArray) => {
  let state = ''
  for( let index = 0;index < addressArray.length; index++){
    for (let index = 0; index < addressArray.length ; index++){
      if(addressArray[index].types[0] && 'administrative_area_level_1' === addressArray[index].types[0]){
        state = addressArray[index].long_name;
        return state;
      }
    }
  }
}

  React.onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat();
    let newLng = event.latLng.lng();

    console.log('new Lat,' , newLat)
    Geocode.fromLatLng(newLat, newLng).then((response) => {
      const address = response.results[0].formatted_address,
        addressArray = response.results[0].address_components,
        city = this.getCity(addressArray),
        area = this.getArea(addressArray),
        state = this.getState(addressArray);
      this.setState({
        address : (address) ? address : "",
        area : (area) ? area : "",
        city : (city) ? city : "",
        state : (state) ? state : "",
        markerPosition: {
          lat: newLat,
          lng: newLat,
        },
        mapPosition: {
          lat: newLat,
          lng: newLat
        }

      })
    });
    console.log(newLat);
  };


  function Map() {
    return (
      <>
      <div>
          <Descriptions title="User Info" bordered>
        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
        <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
        <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
        <Descriptions.Item label="Usage Time" span={2}>
          2019-04-24 18:00:00
        </Descriptions.Item>
      </Descriptions>,

      </div>
      <GoogleMap
       draggable={true}
       onDragEnd= {this.onMarkerDragEnd}
        defaultZoom={10}
        defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
        defaultCenter= {{lat : 10.833601, lng: 106.670159 }}
      >
       
         <Marker
          draggable={true}
          onDragEnd={React.onMarkerDragEnd}
          position={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
          icon= {{
            url: '../scss/images/maps.png'
          }}
        >
          <InfoWindow>
            <div>412 Quang  Trung - Go vap</div>
          </InfoWindow>
        </Marker> 
        <Marker
          draggable={true}
          onDragEnd={React.onMarkerDragEnd}
          position={{ lat: 10.833601, lng: 106.670159 }}
        >
          <InfoWindow>
            <div>Hem 1275  Phan Văn Trị</div>
          </InfoWindow>
        
        </Marker>
        {/* <Marker
          draggable={true}
          onDragEnd={React.onMarkerDragEnd}
          position={{ lat: 10.949282, lng: 106.865136 }}
        >
          <InfoWindow>
            <div>Hẻm Đoàn Văn Cự</div>
          </InfoWindow>
        </Marker> */}

{
      selectorRes &&  (
        <InfoWindow
        position={{ lat: 10.949282, lng: 106.865136 }}
        onClick = {() => {
          setSelectorRes(null);
        }}
        
        >
          <div>
           Hẻm Đoàn Văn Cự
          </div>
        </InfoWindow>
      )
    }
      </GoogleMap>
   </>
   );
   
  }

  const WrappedMap = withScriptjs(withGoogleMap(Map));

  // img animation
  var scroll =
    window.requestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  var elementsToShow = document.querySelectorAll(".show-on-scroll");
  function loop() {
    Array.prototype.forEach.call(elementsToShow, function (element) {
      if (isElementViewPort(element)) {
        element.classList.add("is-visible");
      } else {
        element.classList.remove("is-visible");
      }
    });
    scroll(loop);
  }
  loop();

  function isElementViewPort(el) {
    if (typeof jQuery === "function" && el instanceof jQuery) {
      el = el[0];
    }
    var rect = el.getBoundingClientRect();
    return (
      (rect.top <= 0 && rect.bottom >= 0) ||
      (rect.bottom >=
        (window.innerHeight || document.documentElement.clientHeight) &&
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight)) ||
      (rect.top >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight))
    );
  }
  (function () {
    var container_img = document.getElementById("#container_img"),
      inner_img = document.getElementById("#inner_img");
  })();


  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const productCategoryList = useSelector((state) => state.productCategoryList);

  const userTopSellersList = useSelector((state) => state.userTopSellersList);

  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;

  const dateValue = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    20
  );
  const startDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    6
  );
  const endDate = new Date(new Date().getFullYear(), new Date().getMonth(), 26);

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch]);

  return (
    <div  id="header">
      <div id="">
        <div className="header-general " data-aos="fade-down">
          <div className="header-left">
            <div className="arrow-right ">
              <video
                loop
                autoPlay
                className="symbol-restaurant animate__tada"
                width={400}
                controls
              >
                <source src={logo_video} type="video/mp4" />
                Your browser does not support HTML video.
              </video>
              {/* <img
                className="symbol-restaurant animate__tada"
                src={logo_v2}
              ></img> */}
            </div>
            <div className=" text-left-homeScreen " data-text="text-create">
              <div className="check-text tracking-in-expand-fwd ">XEM</div>
              <div className="second-text tracking-in-expand-fwd ">MÓN ĂN</div>
              <div className="second-text tracking-in-expand-fwd ">NGON NHẤT</div>
            </div>{" "}
            <div className="text-left-homeScreen-bottom ">
              <p>hoặc là</p>
              <p>Lựa chọn thức uống </p> <p> của chúng tôi</p>
              <img
                src="http://www.nicdarkthemes.com/themes/restaurant/wp/demo/hamburger/wp-content/uploads/sites/7/revslider/home-6/divider.png"
                alt="Girl in a jacket"
                width="500"
                height="600"
              />
            </div>
            <div className="icon-common">
              <a className ='text-white' href = 'https://www.facebook.com/ '>
               <i className="fab fa-facebook"></i>
              </a>
              <a className =' text-white' href = 'https://twitter.com/'>
                <i className="fab fa-twitter"></i>
              </a>
              <a className ='text-white' href ='https://www.google.com/'>
              <i className="fab fa-google"></i>
              </a>
            </div>
          </div>
          <div className="header-right ">
            <div className="">
              <div
                className=" "
                style={{ float: "left" }}
              >
                <a  className ='img-right img-contact2 ' href = '/product/60ab74424bb4e134533690e5'>
                <img
                  style={{ marginRight: "-10px" }}
                  className="img-beauty1 show-on-scroll img-dish-header  img-fluid"
                  src="https://cdn2.civitatis.com/vietnam/hoi-an/galeria/plato-tradicional-vietnamita.jpg"
                  href=''
                ></img>
                </a>
              </div>
              <div className="img-responsive">
               <a className= 'img-right img-contact2  ' href = '/product/60ab766a4bb4e134533690e8'>
               <img
                  className="img-beauty1 show-on-scroll img-dish-header img-fluid "
                  src="https://cdn.gobankingrates.com/wp-content/uploads/2019/07/Macaroni-Cheese-iStock-500802479.jpg"
                ></img>
               
               </a>
              </div>
              <div className="btn-direction ">
                <button
                  className=" aqua-gradient "
                  style={{ fontSize: "16px", width: "50px" }}
                >
                  <i className="fas fa-angle-double-down"></i>
                </button>
                <button
                  className=" aqua-gradient"
                  style={{ fontSize: "16px", width: "50px" }}
                >
                  <i className="fas fa-angle-double-up"></i>
                </button>
              </div>
              <div className="clear"></div>
            </div>

            <div className="bottom-header">
              <div className="bottom-header-right">
                <p>Thử Tìm kiếm với Menu của chúng tôi</p>
                <p>
                Thưởng thức món ăn của bạn theo cách của riêng bạn. Chúng tôi sẽ mang đến cho bạn những bữa ăn ngon nhất
                </p>
                <button
                  className=" btn peach-gradient "
                  style={{ fontSize: "14px", marginTop: "3rem" }}
                >
                  Xem thêm
                </button>
              </div>
              <div className="bottom-header-right2 scale-up-center  ">
                <a href = '/product/60ab75014bb4e134533690e6' className = 'img-contact2'>

                <img
                  className="img-beauty1 show-on-scroll"
                  src="https://images.squarespace-cdn.com/content/v1/55046251e4b00ffe14052494/1436475494351-LOPCPMXJBMZRXY6JOWC2/ke17ZwdGBToddI8pDm48kCzWSLz9lK-06v0GZHI-TLt7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0s1LK8gu64hle203mIYOUnqksR3XSGwPB2EkeycIRX0pzxKzR1T8IodLmN-9Wnk3Sw/image-asset.jpeg"
                ></img>
                </a>
              </div>
              <div className="clear"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="describe-home">
        <div className="session1">
          <img
            className="background-dish"
            src="http://static1.squarespace.com/static/518ea9e4e4b0eb1ecff22776/518ea9e5e4b0eb1ecff2277a/58768871f5e231cc32548478/1536167840749/shutterstock_553173229.jpg?format=1500w"
          ></img>
          <div className="content-dish-special-left">
            <p className="content-dish fw-bold">CÁ HỒI SỐT CAM</p>
            <a href="#" className='fw-bold'>Kiểm tra</a>
          </div>
        </div>
        <div className="session2 ">
          <div className=" ">
            <p>YÊU CẦU ĐẶC BIỆT</p>
            <p>Mở đặc biệt</p>
            <a href="#" className='fw-bold'>Kiểm tra</a>
          </div>
        </div>
        <div className="session3">
          <img
            className="background-dish"
            src="https://cdn.shrm.org/image/upload/c_crop%2Ch_705%2Cw_1254%2Cx_0%2Cy_0/c_fit%2Cf_auto%2Cq_auto%2Cw_767/v1/Legal%20and%20Compliance/chef2m_zmfr42?databtoa=eyIxNng5Ijp7IngiOjAsInkiOjAsIngyIjoxMjU0LCJ5MiI6NzA1LCJ3IjoxMjU0LCJoIjo3MDV9fQ%3D%3D"
          ></img>
          <div className="content-dish-special-right">
            <p className="content-dish fw-bold">BEEFSTEAK</p>
            <a href="#" className= 'fw-bold'>Kiểm tra</a>
          </div>
          <div className="clear"></div>
        </div>
      </div>
      <div className="services">
        <div className="top-services" data-aos="flip-up">
          <p>Giải pháp tốt nhất</p>
          <p>DỊCH VỤ CỦA CHÚNG TÔI</p>
        </div>
        <div className="row" data-aos="zoom-in-up">
          <div className="content-left-services content-left-res-1200 col">
            {/* {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )} */}

            <div className="">
              <Link className="" to="search/category/Thịt%20Bò">
                <img
                  className="img-card box responsive-1200"
                  src={thitbo}
                  style= {{width : '250px'}}
                ></img>
              </Link>
            </div>
            <div className="">
              <Link className="" to="/search/category/Món%20ăn%20truyền%20thống%20Việt%20Nam">
                <img
                  className="img-card box responsive-1200"
                  src= {monan}
                  style= {{width : '250px'}}
                ></img>
              </Link>
            </div>
            <div className="" data-aos="zoom-in-up" >
              <Link className="" to="/search/category/Nước%20uống">
                <img
                  className="img-card box responsive-1200"
                  src= {drink} style= {{width : '250px'}}
                ></img>
              </Link>
            </div>
            <div className="" data-aos="zoom-in-up">
              <Link className="" to ="/search/category/Món%20ăn%20nhanh">
                <img
                  className="img-card box img-responsive-special responsive-1200"
                  style={{ marginTop: "10px",width : '250px' }} 
                  src={fastFood}
                ></img>
              </Link>
            </div>
            {/* <img
              className="img-content-left content-sample-food"
              src="https://luhanhvietnam.com.vn/du-lich/vnt_upload/news/12_2020/thit-trau-la-trong-quang-tri-xao.jpg"
            ></img>
            <img
              className="img-content-left"
              src="https://image.freepik.com/free-photo/traditional-food-chicken-soup-with-ginseng_1205-8407.jpg"
            ></img>
            <img
              className="img-content-left"
              src="https://topvietnamtravel.com/wp-content/uploads/2018/10/Rice-noodle-soup-with-Snakehead-fish.jpg"
            ></img>
            <img
              className="img-content-left"
              src="https://vinlove.net/wp-content/uploads/2020/11/dac-san-quang-tri-banh-it-la-gai.jpg"
            ></img> */}
          </div>
          <div className="content-right-services col">
            <h3>
              Vietnamese Food: A Beginner's Guide -{" "}
              <a href="https://www.youtube.com/watch?v=hyrsMKhaQJM">Let GO</a>
            </h3>
            <ReactPlayer
              className="video-edit"
              url="https://www.youtube.com/watch?v=hyrsMKhaQJM"
            />
          </div>
        </div>
      </div>

      <div className="reserve-book row" data-aos="zoom-in-down">
        <div className="col-4 content-book">
          <p>Dự trữ!!!</p>
          <p>Đặt bàn ngay bây giờ</p>
        </div>
        <div className="date-time col-4">
          {/* <Calendar
            onChange={onchange}
             value={date}
          /> */}
          {/* <CalendarComponent
            value={dateValue}
            min={startDate}
            max={endDate}
            inMultiSelection={true}
            state="Decade"
            depth="Year"
            className="calendar-book"
          ></CalendarComponent>
          <input
            className="number-of-people"
            type="text"
            id="number"
            name="number"
            placeholder="your number of people"
          /> */}
           <div className=" content-right-book">
          {" "}
          <Link className="book-btn" type="submit" to="./BookServiceScreen">
            {/* Book */}
          </Link>
          </div>
        </div>
       
          <div className="content-comment  col-4">Khám phá Menu mới của chúng tôi!</div>
  
      </div>

      {/* ========= SPECIAL - FOOD ============== */}
      <div className="special-food row">
        <div className="menu-header" data-aos="zoom-in-down">
          <p>Thực đơn tốt nhất</p>
          <p>Đặc biệt</p>
        </div>
        <div className="col " data-aos="zoom-in-down" style ={{ textAlign: '-webkit-center'}} >
          <div className="col-3 special-left">
            <img src={boomxidau} className = 'small menu-list' ></img>
          </div>
          <div className="menu-content">
            <div className="content-special">
              <p>Bò om xì dầu</p>
              <p>Lorem ipsum dolor sit</p>
            </div>
            <div className="content-special-left">
              <p> $10</p>
              <p className="status-special">starter</p>
            </div>
          </div>

          <div className="col-3 special-left">
            <img src={bocuonhanh} className = 'small menu-list' ></img>
          </div>
          <div className="menu-content">
            <div className="content-special">
              <p>Bò Cuốn Hành</p>
              <p>Lorem ipsum dolor sit</p>
            </div>
            <div className="content-special-left">
              <p> $8</p>
              <p className="status-special">starter</p>
            </div>
          </div>
          <div className="col-3 special-left">
            <img src={nemran} className = 'small menu-list'></img>
          </div>
          <div className="menu-content">
            <div className="content-special">
              <p>Nem Rán</p>
              <p>Lorem ipsum dolor sit</p>
            </div>
            <div className="content-special-left">
              <p> $9</p>
              <p className="status-special">starter</p>
            </div>
          </div>
          <div></div>
          {/* <div className="col-1">fff</div> */}
        </div>
        <div className=" col-6 special-right-general" data-aos="zoom-in-down">
          <div className="col-3 special-left">
            <img src={nuocrauma} className = 'small menu-list' ></img>
          </div>
          <div className="menu-content">
            <div className="content-special">
              <p>Nước Rau Má</p>
              <p>Lorem ipsum dolor sit</p>
            </div>
            <div className="content-special-left">
              <p> $5</p>
              <p className="status-special">starter</p>
            </div>
          </div>

          <div className="col-3 special-left">
            <img src={cocktailChanh} className = 'small menu-list'></img>
          </div>
          <div className="menu-content">
            <div className="content-special">
              <p>Cocktail Chanh</p>
              <p>Lorem ipsum dolor sit</p>
            </div>
            <div className="content-special-left">
              <p> $4 </p>
              <p className="status-special">starter</p>
            </div>
          </div>
          <div className="col-3 special-left">
            <img src={blueOceanCocktail} className = 'small menu-list' ></img>
          </div>
          <div className="menu-content">
            <div className="content-special">
              <p>blue Ocean Cocktail</p>
              <p>Lorem ipsum dolor sit</p>
            </div>
            <div className="content-special-left">
              <p> $9</p>
              <p className="status-special">starter</p>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-us row">
        <div className="col-6 contact-input-left" data-aos="fade-down-right">
          <div className=" img-contact2">
            <img
                className="img-beauty1 show-on-scroll small" style = {{float : 'left'}}
                src= {anh2}
              ></img>
              <img
                className="img-beauty1 show-on-scroll small" style = {{float : 'left'}}
                src={anh4}
              ></img>
          </div>

          <div className="img-contact2">
            <img
                className="img-beauty1 show-on-scroll small"
                src={anh1}
              ></img>
              <img
                className="img-beauty1 show-on-scroll small"
                src={anh3}
              ></img>
          </div>
        
        </div>
        <div className="col-6">
          <div className="img-contact1" id="container-img">
            <div id="inner_img">
              <div className="demo-img">
                <div className="demo-overplay">
                  <img
                    className="img-beauty inline-photo show-on-scroll"
                    style={{ width: "86%", height: "320px" }}
                    src="https://nomadicboys.com/wp-content/uploads/2020/12/Banh-Cuon-Vietnam-traditional-food.jpg"
                  ></img>
                </div>
              </div>
            </div>
          </div>
          <div className="img-contact2">
            <img
              className="img-beauty1 show-on-scroll"
              src="https://bigseventravel.com/wp-content/uploads/2019/08/white-rose-dumpling-vietnam-1024x683.jpg"
            ></img>
            <img
              className="img-beauty1 show-on-scroll"
              src="https://d13jio720g7qcs.cloudfront.net/images/guides/origin/5c396e5a129b9.JPG"
            ></img>
          </div>
        </div>
      </div>

      <div className="partners"></div>
      <div className="block-our-new"></div>
      <div className=""></div>
      <div className="content-home"></div>
      <p className = 'menu-header  text-center' style={{
        color : 'yellowgreen'
      }} >Bán chạy nhất</p>
   
      
      {loadingSellers ? (
        <LoadingBox></LoadingBox>
      ) : errorSellers ? (
        <MessageBox variant="danger">{errorSellers}</MessageBox>
      ) : (
        <>
          {sellers.length === 0 && <MessageBox>Không tìm thấy người bán</MessageBox>}
          <Carousel showArrows autoPlay showThumbs={false}>
            {sellers.map((seller) => (
              <div key={seller._id}>
                <Link to={`/seller/${seller._id}`}>
                  <img src={seller.seller.logo} alt={seller.seller.name} />
                  <p className="legend">{seller.seller.name}</p>
                </Link>
              </div>
            ))}
          </Carousel>
        </>
      )}
      <p className = 'menu-header  text-center' style={{
        color : 'yellowgreen'
      }}  data-aos="fade-right " data-aos-offset="300"  data-aos-easing="ease-in-sine">Sản phẩm nổi bật</p>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>Không tìm thấy sản phẩm</MessageBox>}
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
      )}
    
      <div style={{ marginBottom: "10rem" }}></div>
          </div>
  );
}
