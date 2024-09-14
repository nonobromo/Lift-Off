import httpService, { setDefaultCommonHeaders } from "./httpService";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";

refreshToken();

function refreshToken() {
  setDefaultCommonHeaders("x-auth-token", getJWT());
}

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
  refreshToken();
}

function getJWT() {
  return localStorage.getItem(TOKEN_KEY);
}

export function createUser(user) {
  return httpService.post("/users", user);
}

export async function login(credentials) {
  const response = await httpService.post("/users/login", credentials);
  setToken(response.data);
  return response;
}

export function getUser() {
  try {
    const token = getJWT();
    const { _id, isBusiness, isAdmin } = jwtDecode(token);
    return { _id, isBusiness, isAdmin };
  } catch {
    return null;
  }
}

export function logout() {
  setToken(null);
}

export async function getMe(_id) {
  const { data } = await httpService.get(`/users/${_id}`);
  return data;
}

export async function editUser(_id, data) {
  const response = await httpService.put(`/users/${_id}`, data);
  return response;
}

export async function getAllUsers() {
  const response = await httpService.get("/users");
  return response;
}

export async function changeUserStatus(id) {
  return httpService.patch(`/users/${id}`);
}

export async function deleteUser(id) {
  return httpService.delete(`/users/${id}`);
}

const usersService = {
  createUser,
  login,
  getUser,
  logout,
  getMe,
  editUser,
  getAllUsers,
  changeUserStatus,
  deleteUser,
};

export default usersService;
