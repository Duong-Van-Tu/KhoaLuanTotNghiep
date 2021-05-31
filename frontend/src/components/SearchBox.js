import React, { useState } from 'react';
import "../scss/homeScreen.css";

export default function SearchBox(props) {
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <form className="search form-inline md-form mr-auto mb-4" onSubmit={submitHandler}>
      <div className="row style-reponsive " style={{ width: "500px", fontSize :'15px'}}>
        <input
         className="form-control mr-sm-2 col-10 p-3"
         style={{ width: "70%", fontSize: "20px", color: "white" }}
          type="text"
          name="q"
          id="q"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button  className="primary btn btn-outline-warning btn-rounded btn-sm my-0 btn-search "
          type="submit"
          style={{ fontSize: "15px", width :'27%' }}>
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
}
