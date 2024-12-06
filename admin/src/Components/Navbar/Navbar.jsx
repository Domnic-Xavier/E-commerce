import React from 'react'
import './Navbar.css';
import navlogo from '../../assets/nav-logo.svg';
import navProfile from '../../assets/nav-profile.svg';
export const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={navlogo} alt="" className='nav-logo' />
      <a href="your-link-here">
          <img src={navProfile} alt="Profile" className="nav-profile" />
      </a>

    </div>
  )
}

export default Navbar;