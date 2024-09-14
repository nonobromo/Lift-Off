import { useEffect, useState } from "react";
import usersService from "../services/usersService";

function useAllUsers() {
  const [users, setAllUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const { data } = await usersService.getAllUsers();
        setAllUsers(data);
      } catch (err) {}
    };
    getAllUsers();
  }, []);

  return { users };
}

export default useAllUsers;
