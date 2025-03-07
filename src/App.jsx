import { BrowserRouter } from 'react-router-dom';

import NavBar from './common/NavBar';
import RouteList from './common/RouteList';
import useAuth from './hooks/useAuth';
import userContext from './users/userContext';
import LoadingScreen from './common/LoadingScreen';

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
  const { user, login, signup, logout, token } = useAuth();

  if (token && !user) return <LoadingScreen />;

  return (
    <div>
      <userContext.Provider value={user} >
        <BrowserRouter >
          <NavBar logout={logout} />
          <div className='pb-3'>
            <RouteList login={login} signup={signup} />
          </div>
        </BrowserRouter>
      </userContext.Provider>
    </div>

  );
};

export default App;
