import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  createTable,
  deleteTable,
  listTables,
} from '../actions/tableActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  TABLE_CREATE_RESET,
  TABLE_DELETE_RESET,
} from '../constants/tableConstants';

export default function TableListScreen(props) {
  const { pageNumber = 1 } = useParams();

  const sellerMode = props.match.path.indexOf('/seller') >= 0;
  const tableList = useSelector((state) => state.tableList);
  const { loading, error, tables, page, pages } = tableList;

  console.log('aaaa ', tableList)

  const tableCreate = useSelector((state) => state.tableCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    table: createdTable,
  } = tableCreate;

  const tableDelete = useSelector((state) => state.tableDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = tableDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: TABLE_CREATE_RESET });
      props.history.push(`/table/${createdTable._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: TABLE_DELETE_RESET });
    }
    dispatch(
      listTables({ seller: sellerMode ? userInfo._id : '', pageNumber })
    );
  }, [
    createdTable,
    dispatch,
    props.history,
    sellerMode,
    successCreate,
    successDelete,
    userInfo._id,
    pageNumber,
  ]);

  const deleteHandler = (table) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteTable(table._id));
    }
  };
  const createHandler = () => {
    dispatch(createTable());
  };
  return (
    <div>
      <div className="row">
        <h1>Bàn</h1>
        <button type="button" className="primary btn" onClick={createHandler}>
        Thêm bàn
        </button>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <table className="table">
            <thead style={{textAlignLast:'center'}}>
              <tr>
                <th>ID</th>
                <th>TÊN</th>
                <th>GIÁ BÁN</th>
                <th>THỂ LOẠI</th>
                <th>NHÃN HIỆU</th>
                <th>HÀNH ĐỘNG</th>
              </tr>
            </thead>
            <tbody style={{textAlignLast:'center'}}> 
              {tables.map((table) => (
                <tr key={table._id}>
                  <td>{table._id}</td>
                  <td>{table.name}</td>
                  <td>{table.price}</td>
                  <td>{table.category}</td>
                  <td>{table.brand}</td>
                  <td>
                    <button
                      type="button"
                      className="small btn-primary"
                      onClick={() =>
                        props.history.push(`/table/${table._id}/edit`)
                      }
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      type="button "
                      className="small btn-danger w-25"
                      onClick={() => deleteHandler(table)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row center pagination ">
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === page ? 'active' : ''}
                key={x + 1}
                to={`/tablelist/pageNumber/${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
