import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import logo from '../ebook.png';
import userPhoto from '../avatar.jpg'
import 'bootstrap/js/dist/collapse';


function Header() {
    let  location = useLocation()
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
            {/* <!-- Navbar brand -->*/}
                <Link className="navbar-brand me-2" to="/">
                <img
                    src={logo}
                    height="60"
                    alt="Logo"   
                />
                </Link>

            { /* <!-- Toggle button -->*/}
                <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarButtonsExample"
                aria-expanded="false"
                aria-label="Toggle navigation"
                >
                <i className="navbar-toggler-icon"></i>
                </button>

                {/*<!-- Collapsible wrapper -->*/}
                <div className="collapse navbar-collapse" id="navbarNav">
                    {/*  <!-- Left links -->*/}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link className="nav-link fw-bold" to="/dashboard">Dashboard</Link>
                        </li>
                    </ul>
                    <div>
                    {  (location.pathname ==='/' || location.pathname === '/register' || location.pathname ==='/login' ) ? 
                        <div className="d-flex align-items-center">
                            <Link type="button" className="btn btn-info px-3 me-2" to="/login">
                            Login
                            </Link>
                            <Link type="button" className="btn btn-info me-3"  to="/register">
                            Sign up
                            </Link>
                        
                        </div>
                     : 

                        <div className="d-flex align-items-center">
                             <input type="search" className="form-control rounded mx-5" placeholder="Search" aria-label="Search" aria-describedby="search-addon"/>
                            <img src={userPhoto} alt='userPhoto' className='rounded-circle' width={65}/>
                        </div>
                    

                   }
                    </div>
                    
                    
                   
                
                    
                </div>
                {/*<!-- Collapsible wrapper -->*/}
            </div>
            {/*<!-- Container wrapper -->*/}
        </nav>
    </div>
    
  )
}

export default Header
