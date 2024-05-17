import {Route, Routes} from 'react-router-dom';

import HomePage from './HomePage';
import RatingDetail from '../ratings/RatingDetail';
import LoginPage from '../users/LoginPage';
import SignupPage from '../users/SignupPage';


/** Component for configuring url routes.
 *
 * props: none
 *
 * state: none
 *
 * App -> RouteList -> HomePage, RatingDetail, LoginPage, SignupPage
 */

function RouteList({ login }) {

  return (
    <Routes>
      <Route path='/login' element={<LoginPage login={login} />} />
      <Route path='/signup' element={<SignupPage />} />

      <Route path='/' element={<HomePage />}/>
      <Route path='/ratings/:id' element={<RatingDetail />} />
    </Routes>
  )
}

export default RouteList;