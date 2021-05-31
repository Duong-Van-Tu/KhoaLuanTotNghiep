import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';

export default function UserListScreen(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    dispatch({
      type: USER_DETAILS_RESET,
    });
  }, [dispatch, successDelete]);
  const deleteHandler = (user) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(user._id));
    }
  };
  return (
    <div>
      <h1>Người dùng</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">Đã xóa người dùng thành côngy</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead  style = {{textAlignLast:'center'}}>
            <tr>
              <th>ID</th>
              <th>TÊN</th>
              <th>EMAIL</th>
              <th>NGƯỜI BÁN</th>
              <th>QUẢN TRỊ VIÊN</th>
              <th>CHỨC NĂNG</th>
            </tr>
          </thead>
          <tbody  style = {{textAlignLast:'center'}}>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isSeller ? 'YES' : ' NO'}</td>
                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                <td>
                  <button
                    type="button  btn-edit"
                    className="small text-white"
                    style = {{backgroundColor: '#FFD319'}}
                    onClick={() => props.history.push(`/user/${user._id}/edit`)}
                  >
                    Chỉnh sửa
                    <i className="far fa-edit m-2"></i>
                  </button>
                  <button
                    type="button btn btn-primary"
                    className="small text-white"
                    style={{ backgroundColor:'#F6465B', }}
                    onClick={() => deleteHandler(user)}
                  >
                    Xóa
                    <i className="far fa-trash-alt m-2"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
