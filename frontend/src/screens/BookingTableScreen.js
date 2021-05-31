import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveBookingTable } from '../actions/cartTableActions';
import CheckoutSteps from '../components/CheckoutTableSteps';
import { validName, validPhoneNumber} from '../testregex.js';
import MessageBox from '../components/MessageBox';
import '../scss/bookTableAddress.css'
export default function BookingTableScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo } = userSignin;
  const cartTable = useSelector((state) => state.cartTable);
  console.log('carttable : ' , cartTable);
  const { bookingTable } = cartTable;
const bookingRouter = useSelector((state) => state.bookingRouter)
console.log('booking router', bookingRouter);
  
  if (!userInfo) {
    props.history.push('/signin');
  }
  const [fullName, setFullName] = useState(bookingTable.fullName);
  const [phoneNumber, setPhoneNumber] = useState(bookingTable.phoneNumber);
  const [date, setDate] = useState(bookingTable.date);
  const [hour, setHour] = useState(bookingTable.hour);
  const [numberPlace, setNumberPlace] = useState(bookingTable.numberPlace);
  const [description, setDescription] = useState(bookingTable.description);
  console.log('date : ',date);
  console.log('bookingTable :', bookingTable );


  const checkName = (fullName) => {
    return validName.test(fullName);
} 
const checkPhoneNumber = (phoneNumber) => {
  return validPhoneNumber.test(phoneNumber);
}	
const checkDay = (date) => {
  if(typeof(date) === "string" && date !== ""){
    const splitTime = date.split('-');
    const year = parseInt(splitTime[0]);
    const month = parseInt(splitTime[1]);
    const day = parseInt(splitTime[2]);
    const dayCurrent = new Date().getDate();
    const monthCurrent = new Date().getMonth();
    const yearCurrent = new Date().getFullYear();
return year >= yearCurrent && month >= monthCurrent && day >= dayCurrent;
  }
}
const checkHour = (hour) =>{
  if(typeof(hour) === "string" && hour !== "" ){
    const splitHour = hour.split(' ');
    const h = parseInt(splitHour[0]);
    const hourCurrent = new Date().getHours();
    return h >= hourCurrent;
  }
}

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();

     let moveOn = true;

    if (moveOn) {
      dispatch(
        saveBookingTable({
          fullName,
          phoneNumber,
          date,
          hour,
          numberPlace,
          description
        })
      );
      console.log(date);
      
      if(checkName(fullName) && checkPhoneNumber(phoneNumber) && checkDay(date) && checkHour(hour)){
        props.history.push('/paymentTable');
      }
     
    }
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form form-shipping" onSubmit={submitHandler}>
        <div>
          <h1>Booking Table</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        {!checkName(fullName) && <MessageBox variant="danger">
          <div className = 'message'>
            For example: Duong Van Tu. Name starting with a capital letter and up to four letters
          </div>
          </MessageBox>}
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          ></input>
        </div>
        {!checkPhoneNumber(phoneNumber) && <MessageBox variant="danger"> For example: 0868060635. Up to 11 numbers</MessageBox>}
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            placeholder="Enter Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          ></input>
        </div>
        {!checkDay(date) &&<MessageBox variant="danger">current date month year or later</MessageBox>}
        <div>
          <label htmlFor="hour">hour</label>
          <select
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            required
          >
            <option value="11 PM">11AM</option>
            <option value="12 PM">12AM</option>
            <option value="13 PM">13PM</option>
            <option value="14 PM">14PM</option>
            <option value="16 PM">16PM</option>
            <option value="17 PM">17PM</option>
            <option value="18 PM">18PM</option>
            <option value="19 PM">19PM</option>
          </select>
        </div>
        {!checkHour(hour) &&<MessageBox variant="danger">The reservation time must be after or the current time</MessageBox>}
        <div>
          <label htmlFor="numberPlace">Number Place</label>
          <select
            value={numberPlace}
            onChange={(e) => setNumberPlace(e.target.value)}
            required
          >
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>
            <option value="10">10</option>
          </select>
        </div>
        <div>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="4" cols="50"  placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required >
           
        </textarea>
        </div>
        <div>
          <label />
          <button className="primary" type="submit" 
          // onClick={!validate(date)}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
