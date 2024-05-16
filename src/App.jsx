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
