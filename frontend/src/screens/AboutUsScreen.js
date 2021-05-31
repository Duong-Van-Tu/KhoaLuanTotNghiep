import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUser } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import "../scss/aboutUs.scss";
import background from "../scss/images/background-10.jpg";

export default function AboutUsScreen(props) {
  const userId = props.match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      props.history.push("/userlist");
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsSeller(user.isSeller);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, props.history, successUpdate, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update user
    dispatch(updateUser({ _id: userId, name, email, isSeller, isAdmin }));
  };
  return (
    <div className="form-about-us">
      <form className="" onSubmit={submitHandler}>
        <div>
          <div style={{ textAlign: "center" }}>
            <h1>Về chúng tôi</h1>
          </div>
          <div className="content-about-us">
          Thực phẩm Việt Nam ngày càng được đánh giá cao trên toàn cầu. Có các nhà hàng Việt Nam ở khắp Châu Âu và Mỹ hoặc bất cứ nơi nào người Việt nhập cư đến định cư. Ẩm thực của họ được coi là một trong những chế độ ăn uống lành mạnh trên thế giới, chủ yếu là do sử dụng tối thiểu dầu, ít thịt và nhiều rau tươi. Món ăn Việt Nam có ảnh hưởng từ nhiều nền văn hóa khác nhau bao gồm Ấn Độ, Trung Quốc, Pháp và Mỹ. Do đó, nhiều người coi ẩm thực Việt Nam là món ăn kết hợp nguyên bản và giản dị. Thực đơn Việt Nam nhất định phải thử bao gồm Phở (phở bò), Bánh Mì Thít (bánh mì tròn nhồi với nhiều nguyên liệu khác nhau như giăm bông) và bánh cuốn tôm tươi Việt Nam.
          </div>
        </div>
      </form>

      <div className="row member-about-us">
        <div className="" style={{ textAlign: "center" }}>
          <h1>Thành viên</h1>
        </div>
        <div className="col-6">
          <div className="card-container-about-us">
            <div className="card-about-us">
              <div className="front-about-us ">
                {/* <h2 className="sub-title-about-us">Season 1</h2> */}
                {/* <h1 className="title-about-us">Rick and Morty</h1> */}
                <img
                  className="image-about-us"
                  src="https://scontent-sin6-1.xx.fbcdn.net/v/t1.6435-1/p200x200/93670683_277977993211999_4144409626915373056_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=7206a8&_nc_ohc=RYV2n5bW0PUAX9qdtiV&_nc_ht=scontent-sin6-1.xx&tp=6&oh=44b6ab73002753214c67a91d73f391d7&oe=60AF20E0"
                  alt=""
                />
              </div>
              <div className="back-about-us">
                <h3 className="synopsis-about-us">Duong Van Tu</h3>
                <p className="p-about-us">Người sáng lập VietFood</p>
                <div className="btn-about-us">
                  <i className="fab fa-facebook-f"></i>
                  <a
                    style={{ color: "#fff" }}
                    href="https://www.facebook.com/profile.php?id=100029994021905"
                  >
                    {" "}
                    Xem bây giờ
                  </a>
                </div>
                <div className="btn-about-us secondary-about-us">
                  <i className="fa fa-heart " />
                  Thêm vào danh sách
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card-container-about-us">
            <div className="card-about-us">
              <div className="front-about-us">
                {/* <h2 className="sub-title-about-us">Season 1</h2>
                <h1 className="title-about-us">Rick and Morty</h1> */}
                <img
                  className="image-about-us"
                  src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.6435-9/30652335_2131096027123903_2104053046077030400_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=NBo4tpHC32cAX8e1-Da&_nc_ht=scontent.fsgn5-5.fna&oh=57849f99124b6b0c269fd9e3328cecfb&oe=60B0BA30"
                  alt=""
                />
              </div>
              <div className="back-about-us">
                <h3 className="synopsis-about-us">Hoang Trung Nghia</h3>
                <p className="p-about-us">Người sáng lập VietFood</p>
                <div className="btn-about-us ">
                  <i className="fab fa-facebook-f"></i>
                  <a
                    style={{ color: "#fff" }}
                    href="https://www.facebook.com/profile.php?id=100006705799121"
                  >
                    {" "}
                    Xem bây giờ
                  </a>
                </div>
                <div className="btn-about-us secondary-about-us">
                  <i className="fa fa-heart " />
                  Thêm vào danh sách
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div>
    //   <form className="form" onSubmit={submitHandler}>
    //     <div>
    //       <h1>Edit User {name}</h1>
    //       {loadingUpdate && <LoadingBox></LoadingBox>}
    //       {errorUpdate && (
    //         <MessageBox variant="danger">{errorUpdate}</MessageBox>
    //       )}
    //     </div>
    //     {loading ? (
    //       <LoadingBox />
    //     ) : error ? (
    //       <MessageBox variant="danger">{error}</MessageBox>
    //     ) : (
    //       <>
    //         <div>
    //           <label htmlFor="name">Name</label>
    //           <input
    //             id="name"
    //             type="text"
    //             placeholder="Enter name"
    //             value={name}
    //             onChange={(e) => setName(e.target.value)}
    //           ></input>
    //         </div>
    //         <div>
    //           <label htmlFor="email">Email</label>
    //           <input
    //             id="email"
    //             type="email"
    //             placeholder="Enter email"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //           ></input>
    //         </div>
    //         <div>
    //           <label htmlFor="isSeller">Is Seller</label>
    //           <input
    //             id="isSeller"
    //             type="checkbox"
    //             checked={isSeller}
    //             onChange={(e) => setIsSeller(e.target.checked)}
    //           ></input>
    //         </div>
    //         <div>
    //           <label htmlFor="isAdmin">Is Admin</label>
    //           <input
    //             id="isAdmin"
    //             type="checkbox"
    //             checked={isAdmin}
    //             onChange={(e) => setIsAdmin(e.target.checked)}
    //           ></input>
    //         </div>
    //         <div>
    //           <button type="submit" className="primary">
    //             Update
    //           </button>
    //         </div>
    //       </>
    //     )}
    //   </form>
    // </div>
  );
}
