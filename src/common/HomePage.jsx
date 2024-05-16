import { useState, useEffect } from 'react';
import { AlbumRaterApi } from '../api/api';
import RatingCard from '../ratings/RatingCard';
import LoadingScreen from './LoadingScreen';

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