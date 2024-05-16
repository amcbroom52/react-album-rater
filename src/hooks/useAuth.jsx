import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import AlbumRaterApi from "../api/api";
import { jwtDecode } from "jwt-decode";

function useAuth(initialToken) {
  console.log('in useAuth hook');
  const [token, setToken] = useLocalStorage(initialToken);
  const [user, setUser] = useState();

  useEffect(function getUserData() {
    async function fetchUserData() {
      AlbumRaterApi.token = token;
      const { username } = jwtDecode(token);
      const userData = await AlbumRaterApi.getUser(username);
      setUser({
        username: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        jobs: userData.applications,
        isAdmin: userData.isAdmin,
      });
    }
    if (token) {
      fetchUserData();
    } else {
      setUser(null);
      AlbumRaterApi.token = null;
    }
  }, [token]);

  async function login(username, password) {
    const resp = await AlbumRaterApi.login(username, password);
    setToken(resp.token);
  }

  async function signup(data) {
    const resp = await AlbumRaterApi.signup(inputValues);
    setToken(resp.token);
  }

  // async function update(data) {
  //   const updatedData = await AlbumRaterApi.updateUser(data);
  //   setUser((user) => ({
  //     ...user,
  //     ...updatedData,
  //   }));
  // }

  async function logout() {
    setToken(null);
  }

  return { user, login, signup, logout, token };
}

export default useAuth;