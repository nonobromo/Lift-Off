import { useEffect, useState } from "react";
import usersService from "../../services/usersService";

function UserListItem({ data, fetchAllUsers }) {
  const [isBusiness, setIsBusiness] = useState(false);

  useEffect(() => {
    if (data) {
      setIsBusiness(data?.isBusiness);
    }
  }, [data.isBusiness, data]);

  const handleUserStatus = async () => {
    await usersService.changeUserStatus(data._id);
    setIsBusiness((perv) => !perv);
  };

  const handleDeleteUser = async () => {
    const verify = confirm("Are you sure you want to delete this user?");

    if (verify) {
      await usersService.deleteUser(data._id);
      fetchAllUsers();
    } else {
      return;
    }
  };
  return (
    <li className="list-group-item">
      <div className="row d-flex justify-content-between fs-0">
        <div className="col-2">{data?.name?.first}</div>
        <div className="col-2">{isBusiness ? "Yes" : "No"}</div>
        <div className="col-2">
          <button className="btn btn-warning btn-sm" onClick={handleUserStatus}>
            <i className="bi bi-shift"></i>
          </button>
        </div>
        <div className="col-2">
          <button className="btn btn-danger btn-sm" onClick={handleDeleteUser}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </li>
  );
}

export default UserListItem;
