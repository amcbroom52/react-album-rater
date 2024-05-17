import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import StarField from "./StarField";
import LoadingScreen from "../common/LoadingScreen";
import { AlbumRaterApi } from "../api/api";

import "./RatingDetail.css";


/** Component for an individual rating page.
 *
 * props: none
 *
 * state:
 * - rating
 *
 * RouteList -> RatingDetail -> StarField
 */

function RatingDetail() {
  const [rating, setRating] = useState();
  const { id } = useParams();

  useEffect(function getRating() {
    async function loadRating() {
      const result = await AlbumRaterApi.getRating(id);
      setRating(result);
    }
    loadRating();
  });

  if(!rating) return <LoadingScreen />;

  return (
    <div className="RatingDetail col-10 mt-3">
      <p className="RatingDetail-Timestamp text-body">
        {rating.timestamp}
      </p>

      <img
        src={rating.album.imageUrl}
        alt={rating.album.name}
        className="RatingDetail-Image h-25 w-25 mb-3" />
      <div className="RatingDetail-title-container col-7 ms-3">
        <h1>
          <a className="text-light" href="/">
            {rating.album.name}
          </a>
        </h1>

        <h3>By:
          <a href="/" className="text-light">
            {rating.album.artistName}
          </a>
        </h3>
      </div>

      <div className="RatingDetail-info">
        <StarField numStars={rating.rating} />

        {
          rating.favoriteSong &&
          <span className="ms-2 text-secondary">
            Favorite Song: {rating.favoriteSong}
          </span>
        }
      </div>
      <h4 className="card-text text-light">{rating.text}</h4>

      <div className="card-header bg-dark">
        <h5 className="text-body mb-0">
          Posted By: <a href="/" className="text-body">
            {rating.author}
          </a>
        </h5>
      </div>

    </div>
  );
}

export default RatingDetail;