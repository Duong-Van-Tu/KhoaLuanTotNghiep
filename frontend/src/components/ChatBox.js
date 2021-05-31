import React, { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import AOS from "aos";
import "../scss/chatBox.css";
const ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://127.0.0.1:5000"
    : window.location.host;

export default function ChatBox(props) {
  AOS.init({
    offset: 400,
    duration: 1000,
  });
  const { userInfo } = props;
  const [socket, setSocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messageBody, setMessageBody] = useState("");
  const [messages, setMessages] = useState([
    { name: "Admin", body: "Hello there, Please ask your question." },
  ]);

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: "smooth",
      });
    }
    if (socket) {
      socket.emit("onLogin", {
        _id: userInfo._id,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
      });
      socket.on("message", (data) => {
        setMessages([...messages, { body: data.body, name: data.name }]);
      });
    }
    else {
      
    }
  }, [messages, isOpen, socket]);

  const supportHandler = () => {
    setIsOpen(true);
    console.log(ENDPOINT);
    const sk = socketIOClient(ENDPOINT);
    setSocket(sk);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert("Error. Please type message.");
    } else {
      setMessages([...messages, { body: messageBody, name: userInfo.name }]);
      setMessageBody("");
      setTimeout(() => {
        socket.emit("onMessage", {
          body: messageBody,
          name: userInfo.name,
          isAdmin: userInfo.isAdmin,
          _id: userInfo._id,
        });
      }, 1000);
    }
  };
  const closeHandler = () => {
    setIsOpen(false);
  };
  return (
    <div
      className="chatbox"
      data-aos="fade-up"
      data-aos-anchor-placement="bottom-bottom"
    >
      {!isOpen ? (
        <button
          type="button"
          style={{
            borderRadius: "50%",
            marginLeft: '150px',
            background:
              "linear-gradient(60deg, rgb(24, 245, 3), rgb(8, 245, 245))",
          }}
          onClick={supportHandler}
        >
          <i style={{ fontSize: "24px" }} className=" fab fa-rocketchat"></i>
        </button>
      ) : (
        <div className=" card-body form-chat-box" style ={{marginLeft :'70px'}} >
          <div className="header-chat-box">
            <strong style={{ fontSize: "20px" }}>Support </strong>
            <button
              type="button"
              className="button-close"
              onClick={closeHandler}
              
            >
              <i className="fa fa-close" />
            </button>
          </div>
          <ul ref={uiMessagesRef}>
            {messages.map((msg, index) => (
              <li key={index}>
                <strong>{`${msg.name}: `}</strong> {msg.body}
              </li>
            ))}
          </ul>

          <div>
            <form onSubmit={submitHandler} className="">
              <input
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                type="text"
                className="message-input"
                placeholder="type message"
              />
              <button type="submit" className="submit-chat-box">
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
