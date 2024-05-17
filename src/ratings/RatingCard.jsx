import { useNavigate } from "react-router-dom";

import StarField from "./StarField";

import "./RatingCard.css";


/** Component for a rating card.
 *
 * props:
 * - rating
 *
 * state: none
 *
 * HomePage -> RatingCard -> StarField
 *
 */

function RatingCard({ rating }) {
  const navigate = useNavigate();

  function LoadRatingDetail() {
    navigate(`/ratings/${rating.id}`);
  }

  return (
    <div className="RatingCard card border-primary mb-3 text-light col-9">
      <div className="RatingCard-Body card-body" onClick={LoadRatingDetail}>
        <p className="RatingCard-TimeStamp text-body">
          {rating.timestamp}
        </p>
        <img
          src={`${rating.album.imageUrl}`}
          alt={`${rating.album.name}`}
          className="RatingCard-Image col-2" />
        <div className="RatingCard-Title">
          <h4>
            <a className="card-title">
              {rating.album.name}
            </a>
          </h4>
          <p className="text-secondary">
            By: <a className="text-secondary">
              {rating.album.artistName}
            </a>
          </p>
        </div>

        <div>
          <StarField numStars={rating.rating} />

          {rating.favoriteSong && (
            <span className="ms-2 text-secondary">
              Favorite Song: {rating.favoriteSong}
            </span>
          )}
        </div>

        <p className="card-text">{rating.text}</p>
      </div>
      <div className="card-header bg-dark">
        <p className="text-body mb-0">
          Posted By: <a className="text-body">
            {rating.author}
          </a>
        </p>
      </div>
    </div>
  );
}

export default RatingCard;