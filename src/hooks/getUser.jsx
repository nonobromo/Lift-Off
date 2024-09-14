import { useEffect, useState } from "react";
import usersService from "../services/usersService";
import { useAuth } from "../contexts/auth.context";
export function useUser(id) {
  const [userInfo, setUserInfo] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        if (!user) return;

        const userData = await usersService.getMe(id);
        setUserInfo(userData);
      } catch (err) {
        console.error(err);
      }
    };
    getUserInfo();
  }, [user]);
  return { userInfo };
}

export default useUser;
