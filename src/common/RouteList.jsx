import {Route, Routes} from 'react-router-dom';

import HomePage from './HomePage';
import RatingDetail from '../ratings/RatingDetail';


/** Component for configuring url routes.
 *
 * props: none
 *
 * state: none
 *
 * App -> RouteList -> HomePage, RatingDetail
 */

function RouteList() {

  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/ratings/:id' element={<RatingDetail />} />
    </Routes>
  )
}

export default RouteList;