import { useState, useEffect } from 'react';
import { AlbumRaterApi } from './api/api';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './common/NavBar';
import RouteList from './common/RouteList';
import './App.css';


/** Component for entire page.
 *
 * Props: none
 * State: none
 *
*/

function App() {
  const [ratings, setRatings] = useState([]);

  useEffect(function getRatings() {
    async function apiCall() {
      const result = await AlbumRaterApi.getRatings();
      setRatings(result);
    }

    apiCall();
  }, []);

  console.log(ratings);

  return (
    <div>
      <BrowserRouter >
        <NavBar />
        <div className='pb-3'>
          <RouteList />
        </div>
      </BrowserRouter>
    </div>

  );
};

export default App;
