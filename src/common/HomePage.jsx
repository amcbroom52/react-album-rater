import { useState, useEffect } from 'react';

import RatingCard from '../ratings/RatingCard';
import LoadingScreen from './LoadingScreen';
import { AlbumRaterApi } from '../api/api';


/** Component for Home Page
 *
 * Props: none
 *
 * State:
 * - ratings
 *
 * RouteList -> HomePage -> RatingCard
 */

function HomePage() {
  const [ratings, setRatings] = useState();

  useEffect(function getRatings() {
    async function apiCall() {
      const result = await AlbumRaterApi.getRatings();
      setRatings(result);
    }

    apiCall();
  }, []);

  console.log(ratings);

  if (!ratings) return <LoadingScreen />;

  return (
    <div>
      {ratings.map((rating) =>
        <RatingCard key={rating.id} rating={rating} />
      )}
    </div>
  );

}

export default HomePage;