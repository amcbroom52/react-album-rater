import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { v4 as uuid } from 'uuid';

import { AlbumRaterApi } from "../api/api";
import userContext from "./userContext";
import LoadingScreen from "../common/LoadingScreen";
import RatingCard from "../ratings/RatingCard";

import "./UserPage.css"

/** Component for a user's profile page
 *
 * props: none
 *
 * state:
 * - user
 * - ratings
 *
 * RouteList -> UserPage -> RatingCard, LoadingScreen
 */

function UserPage() {
  const [user, setUser] = useState({
    data: null,
    following: null,
    isLoading: true
  });
  const [ratings, setRatings] = useState({
    data: null,
    isLoading: true
  });
  const currUser = useContext(userContext);
  const { username } = useParams();

  useEffect(function fetchUserDataOnMount() {
    async function fetchUserData() {
      try {
        const { user, following } = await AlbumRaterApi.getUserWithFollowing(username);
        setUser({
          data: user,
          following: following,
          isLoading: false
        });

        const ratings = await AlbumRaterApi.getRatings({ user: username });
        setRatings({
          data: ratings,
          isLoading: false
        });
        console.log("RUNNING USE EFFECT");

      } catch (err) {
        console.log("ERROR: ", err);
        return <Navigate to="/" />;
      }
    }

    fetchUserData();
  }, []);

  function updateFollow() {
    setUser({
      ...user,
      following: !user.following
    });
  }

  if (user.isLoading) return <LoadingScreen />;

  return (
    <>
      <div className="UserPage-user-info col-10 mt-3 mb-5">
        <img
          src={`${user.data.imageUrl}`}
          alt={`${user.data.username} Image`}
          className="UserPage-image w-25" />

        <div className="UserPage-account ms-3 pt-3">
          <h1 className="text-light">{`${user.data.firstName} ${user.data.lastName || ""}`}</h1>
          <h3 className="UserPage-username text-body-secondary" id="username">{user.data.username}</h3>

          {user.data.username === currUser.username ? (

            <a href="/edit-user" className="UserPage-edit-btn btn btn-outline-primary" >
              Edit
            </a>

          ) : user.following ? (


            <button onClick={updateFollow} className="UserPage-unfollow-btn btn btn-primary" >
              Unfollow
            </button>

          ) : (

            <button onClick={updateFollow} className="UserPage-follow-btn btn btn-outline-primary" >
              Follow
            </button>
          )}

        </div>

        <p className="UserPage-bio col-10 mt-1" >{user.data.bio}</p>
      </div>

      <div id="show-ratings">

        {ratings.isLoading
          ? <LoadingScreen />
          : ratings.data.map(rating => (<RatingCard rating={rating} key={uuid()} />))}

      </div>
    </>
  );
}

export default UserPage;