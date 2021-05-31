import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import "../scss/signIn.css";
import logoWeb from "../scss/images/logo_v2.png";
import intro_video from "../scss/images/intro.mp4";
import restaurant_img from "../scss/images/restaurant2.jpg";
export default function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div className=" row body-signIn">
      <div className="col form-card-signIn">
        <form className="form " onSubmit={submitHandler}>
          <div className="logo-Of-Web">
            <img src={logoWeb}></img>
          </div>
          <div>
            <h1>Đăng nhập</h1>
          </div>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <div>
            <label htmlFor="email">Địa chỉ email</label>
            <input
            style={{color : '#111'}}
              type="email"
              id="email"
              placeholder="Enter email"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="password">Mật khẩu</label>
            <input
          style={{color : '#111'}}
              type="password"
              id="password"
              placeholder="Enter password"
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div>
            <label />
            <button
              className="primary btn"
              type="submit"
              style={{ fontSize: "20px",width:'300px' }}
            >
              Đăng nhập
            </button>
          </div>
          {/* <div>
            <label />
            <div>
              New customer?{" "}
              <Link to={`/register?redirect=${redirect}`}>
                Create your account
              </Link>
            </div>
          </div> */}
        </form>
      </div>

      <div className="col description-signIn">
        <img
          style={{
            borderRadius: "50%",
            marginLeft: "15rem",
            width: "550px",
            marginTop: "-7rem",
          }}
          className= 'res-signInImg'
          src={restaurant_img}
        ></img>
        <div className='res-decoration-sign' >
          <label />
          <div style={{ textAlign: "center" }}>
          Khách hàng mới?{" "}
            <Link to={`/register?redirect=${redirect}`}>
            Tạo tài khoản của bạn
            </Link>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginTop: "-1rem" }}
            viewBox="0 0 1440 360"
          >
            <path
              fill="#0099ff"
              fill-opacity="1"
              d="M0,32L48,42.7C96,53,192,75,288,106.7C384,139,480,181,576,176C672,171,768,117,864,106.7C960,96,1056,128,1152,133.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>

    
  );
}
