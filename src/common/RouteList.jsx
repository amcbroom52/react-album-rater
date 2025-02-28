import {Route, Routes, Navigate} from 'react-router-dom';

import HomePage from './HomePage';
import RatingDetail from '../ratings/RatingDetail';
import LoginPage from '../users/LoginPage';
import SignupPage from '../users/SignupPage';
import { useContext } from 'react';
import userContext from '../users/userContext';


/** Component for configuring url routes.
 *
 * props: none
 *
 * state: none
 *
 * App -> RouteList -> HomePage, RatingDetail, LoginPage, SignupPage
 */

function RouteList({ login, signup }) {

  const user = useContext(userContext);

  return (
    <Routes>
      {user
        ? <>
            <Route path='/' element={<HomePage />}/>
            <Route path='/ratings/:id' element={<RatingDetail />} />
            <Route path='*' element={<Navigate to='/' />} />
        </>

        : <>
            <Route path='/login' element={<LoginPage login={login} />} />
            <Route path='/signup' element={<SignupPage signup={signup} />} />
            <Route path='*' element={<Navigate to='/login' />} />
        </>
      }
    </Routes>
  )
}

export default RouteList;