import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import useLocalStorage from "./useLocalStorage";
import { AlbumRaterApi } from "../api/api";


/** Hook to handle all user related data. */

function useAuth() {
  console.log('in useAuth hook');
  const [token, setToken] = useLocalStorage("token");
  const [user, setUser] = useState();

  useEffect(function getUserData() {
    async function fetchUserData() {
      AlbumRaterApi.token = token;
      const { username } = jwtDecode(token).sub;
      console.log("USERNAME", jwtDecode(token).sub.username);
      const userData = await AlbumRaterApi.getUser(username);
      console.log("USER DATA", userData);
      setUser({
        username: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName,
        imageUrl: userData.imageUrl,
        bio: userData.bio,
      });
    }
    if (token) {
      fetchUserData();
    } else {
      setUser(null);
      AlbumRaterApi.token = null;
    }
  }, [token]);


  /** Verifies username/password combination.
   *
   * Sets token to returned jwt token if combination is valid.
   */

  async function login({ username, password }) {
    const resp = await AlbumRaterApi.login(username, password);
    setToken(resp);
    console.log("TOKEN!!!!", resp);
  }


  /** Creates a new user in the backend with given data.
   *
   * Sets token to returned jwt token if user creation is successful.
   */

  async function signup({ username, firstName, lastName, password }) {
    const resp = await AlbumRaterApi.signup(username, firstName, lastName, password);
    setToken(resp);
  }

  // async function update(data) {
  //   const updatedData = await AlbumRaterApi.updateUser(data);
  //   setUser((user) => ({
  //     ...user,
  //     ...updatedData,
  //   }));
  // }


  /** Sets token to null. */

  async function logout() {
    setToken(null);
  }

  return { user, login, signup, logout, token };
}

export default useAuth;