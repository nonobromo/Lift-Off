import UserListItem from "../components/common/userListItem";
import { useEffect, useState } from "react";
import Pagination from "../components/common/pagination";
import usersService from "../services/usersService";

function AdminPage({ search }) {
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 8;
  const [users, setAllUsers] = useState([]);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  const fetchAllUsers = async () => {
    const { data } = await usersService.getAllUsers();
    setAllUsers(data.filter((user) => user.isAdmin === false));
  };

  console.log(users);
  useEffect(() => {
    fetchAllUsers();
  }, []);

  const filteredUsers = search
    ? users.filter((user) =>
        user.name?.first.toLowerCase().includes(search.toLowerCase())
      )
    : users;

  const currentUsers = filteredUsers
    .slice(firstPostIndex, lastPostIndex)
    .filter((user) => user.isAdmin === false);

  const pagesToDisplay = Math.ceil(filteredUsers.length / postPerPage);

  return (
    <div className="container">
      <h1 className="text-center">Control Panel</h1>
      <div className="container mt-5 w-100 control-panel-sm">
        <ul className="list-group text-center">
          <li className="list-group-item">
            <div className="row d-flex justify-content-between">
              <div className="col-2">User</div>
              <div className="col-2">Is Business</div>
              <div className="col-2">Change Status</div>
              <div className="col-2">Delete User</div>
            </div>
          </li>
        </ul>

        <ul className="list-group text-center mt-3">
          {(search ? filteredUsers : currentUsers).map((user, i) => {
            return (
              <UserListItem
                key={user._id}
                data={user}
                userNumber={i + 1}
                fetchAllUsers={fetchAllUsers}
              />
            );
          })}
        </ul>
      </div>
      {search === "" && (
        <div className="container d-flex justify-content-center align-items-center mt-3">
          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            pagesToDisplay={pagesToDisplay}
          />
        </div>
      )}
    </div>
  );
}

export default AdminPage;
