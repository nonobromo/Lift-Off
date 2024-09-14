import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import usersService from "../services/usersService";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth.context";

function UserInfo() {
  const [userInfo, setUserInfo] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    if (user?._id) {
      const getUserInfo = async () => {
        const userData = await usersService.getMe(user?._id);
        setUserInfo(userData);
      };
      getUserInfo();
    }
  }, [user]);

  return (
    <div className="container">
      <h1>Profile Details</h1>
      <div className="container">
        <div>
          <img src="" alt="" />
        </div>
        <ul className="list-group list-unstyled">
          <li>
            Full Name: {userInfo.name?.first} {userInfo.name?.middle}{" "}
            {userInfo.name?.last}
          </li>
          <li>Phone: {userInfo.phone}</li>
          <li>Email: {userInfo.email}</li>
          <h2 className="mt-4">Address</h2>
          <li className="">
            <ul className="list-group list-unstyled">
              {userInfo.address?.state === "not defiend" ? (
                <li>{userInfo.address?.state}</li>
              ) : (
                true
              )}
              <li>Country: {userInfo.address?.country}</li>
              <li>City: {userInfo.address?.city}</li>
              <li>Street: {userInfo.address?.street}</li>
              <li>House Number: {userInfo.address?.houseNumber}</li>
              <li>ZIP: {userInfo.address?.zip}</li>
            </ul>
          </li>
        </ul>
      </div>
      <Link to="/edit-info/:_id">
        <button className="btn btn-primary mt-3">Edit Info</button>
      </Link>
    </div>
  );
}

export default UserInfo;
