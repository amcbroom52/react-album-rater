import { useState } from 'react';
import { AlbumRaterApi } from './api/api';
import './App.css';


/** Component for entire page.
 *
 * Props: none
 * State: none
 *
*/

function App() {

  function getRatings() {

    async function apiCall() {
      console.log(await AlbumRaterApi.getRatings());
    }
    apiCall();
  }

  getRatings();

  return "Test";
};

export default App;
