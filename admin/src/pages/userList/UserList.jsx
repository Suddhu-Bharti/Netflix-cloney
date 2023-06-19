import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/userContext/UserContext";
import { getUsers } from "../../context/userContext/apiCalls";
import { useEffect } from "react";
import { deleteUser } from "../../context/userContext/apiCalls";

export default function UserList() {
  // const [data, setData] = useState(userRows);
  const { users, dispatch } = useContext(UserContext);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    //setData(data.filter((item) => item.id !== id));
    deleteUser(id, dispatch); 
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "users",
      headerName: "Users",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.profilePic ||
                "https://cdn4.vectorstock.com/i/1000x1000/01/38/young-man-profile-vector-14770138.jpg"} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id} state={params.row}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
