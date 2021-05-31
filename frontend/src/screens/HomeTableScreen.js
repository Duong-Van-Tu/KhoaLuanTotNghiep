import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Table from '../components/Table';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listTables } from '../actions/tableActions';
import { listTopSellers } from '../actions/userActions';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import {
  InfoWindow,
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from "react-google-maps";
// import * as parksData from '../data/skateboard-parks.json'
import AOS from "aos";
import Geocode from "react-geocode";
import { Descriptions } from 'antd';
Geocode.setApiKey("AIzaSyDVGjDTneZNSjh91mqVpqVmEshIYnxZhnI");

export default function HomeScreen() {

  AOS.init({
    offset: 400,
    duration: 1000,
  });

   //google map

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
      
      <GoogleMap
        defaultZoom={10}
        // onDragEnd= {this.onMarkerDragEnd()}
        draggable={true}
        defaultCenter={{ lat: 10.83136, lng: 106.66875 }}
        // defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
      >
        <Marker
          draggable={true}
          // onDragEnd={React.onMarkerDragEnd()}
          // position={{ lat: 10.83136, lng: 106.66875 }}
          // position={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
          icon= {{
            url: '../scss/images/maps.png'
          }}
        >
          <InfoWindow>
            <div>412 Quang  Trung - Go Vap</div>
          </InfoWindow>
        </Marker>
        <Marker
          draggable={true}
          // onDragEnd={React.onMarkerDragEnd()}
          position={{ lat: 10.833601, lng: 106.670159 }}
        >
          <InfoWindow>
            <div>Hem 1275 Phan Van Tri</div>
          </InfoWindow>
        </Marker>
        <Marker
          draggable={true}
          // onDragEnd={React.onMarkerDragEnd()}
          position={{ lat: 10.949282, lng: 106.865136 }}
        >
          <InfoWindow>
            <div>Hẻm Đoàn Văn Cự</div>
          </InfoWindow>
        </Marker>
      </GoogleMap>
      </>
    );
  }

  const WrappedMap = withScriptjs(withGoogleMap(Map));
  const dispatch = useDispatch();
  const tableList = useSelector((state) => state.tableList);
  const { loading, error, tables } = tableList;

  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  useEffect(() => {
    dispatch(listTables({}));
    dispatch(listTopSellers());
  }, [dispatch]);
  return (
    <div>
      <p className = 'menu-header  text-center' style={{
        color : 'yellowgreen'
      }} >Vị trí bàn nổi bật</p>
 
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {tables.length === 0 && <MessageBox>không tìm thấy bàn</MessageBox>}
          <div className="row center row-responsive">
            {tables.map((table) => (
              <Table key={table._id} table={table}></Table>
            ))}
          </div>
        </>
      )}
       <h2>google map</h2>
       <div style = {{padding: '1rem', margin:'0 auto', maxWidth: '1000'}}>
      <Descriptions bordered>
        <Descriptions.Item label="City">Ho Chi Minh</Descriptions.Item>
        <Descriptions.Item label="Area">Go Vap</Descriptions.Item>
        <Descriptions.Item label="Address">Hem 1275 Phan Van Tri</Descriptions.Item>
        <Descriptions.Item label="state">2018-04-24 18:00:00</Descriptions.Item>
        {/* <Descriptions.Item label="Usage Time" span={2}>
          2019-04-24 18:00:00
        </Descriptions.Item> */}
      </Descriptions>,

      </div>
      <div>
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDVGjDTneZNSjh91mqVpqVmEshIYnxZhnI&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `300px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        ></WrappedMap>
      </div>
      <div style={{ marginBottom: "10rem" }}></div>
          
    </div>
  );
}
