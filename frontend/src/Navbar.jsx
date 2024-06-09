import React from 'react'
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <>
    <nav>
        <div className="logo">
            <h2>Blog World</h2>
        </div>
        <div className="links">
            <ul>
             <li> <a href='/'>Home</a></li>
             <li> <a href='/'>About</a></li>
             <li> <a href='/'>Create</a></li>
            </ul>
        </div>
        <div className="main">
         <h4> <Link to="/register">Login/Register</Link> </h4>
        </div>

        <div className="make">
          
        </div>
    </nav>
    </>
  )
}

export default Navbar