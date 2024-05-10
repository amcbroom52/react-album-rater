import {Route, Routes} from 'react-router-dom';
import HomePage from './HomePage';

function RouteList() {

  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
    </Routes>
  )
}

export default RouteList;