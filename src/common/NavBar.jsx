import { NavLink } from 'react-router-dom';

import './NavBar.css';


/** Component for the nav bar.
 *
 * props: logout()
 *
 * state: none
 *
 * App -> NavBar -> NavLink
 */

function NavBar({ logout }) {

  return (
    <div className="NavBar navbar navbar-expand-lg bg-primary">
      <div className="NavBar-left">
        <NavLink className='NavBar-link-home' to='/'>Home</NavLink>
      </div>
      <div className='NavBar-right'>
        <NavLink className='NavBar-link' to='/search'>Search</NavLink>
        <NavLink className='NavBar-link' to='/user'>My Profile</NavLink>
        <NavLink className='NavBar-link active' to='/' onClick={logout}>Logout</NavLink>
      </div>
    </div>
  )
}

export default NavBar;