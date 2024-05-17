import { BrowserRouter } from 'react-router-dom';

import NavBar from './common/NavBar';
import RouteList from './common/RouteList';
import useAuth from './hooks/useAuth';
import userContext from './users/userContext';

import './App.css';


/** Component for entire page.
 *
 * Props: none
 *
 * State: none
 *
 * App -> NavBar, RouteList
 *
*/

function App() {
  const { user } = useAuth();

  return (
    <div>
      <userContext.Provider value={user} >
        <BrowserRouter >
          <NavBar />
          <div className='pb-3'>
            <RouteList />
          </div>
        </BrowserRouter>
      </userContext.Provider>
    </div>

  );
};

export default App;
