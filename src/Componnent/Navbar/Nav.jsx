import React from 'react'
import { Link } from 'react-router-dom';

export default function Nav(props) {
  return (
    <>
      <nav className="navbar p-3 navbar-expand-lg navbar-dark bg-transparent">
        <Link className="navbar-brand" to="home">Noxe</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {props.userData !=null? <>
              <li className="nav-item">
              <Link className="nav-link" to="home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="movies">Movies</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="people">People</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="tv">Tv</Link>
            </li>
            
            
            </> : '' }
            

          </ul>

          <ul className="navbar-nav ms-auto">
            <ul className='navbar-nav mb-2 mb-lg-0' >
              <li className='nav-item d-flex align-items-center'>
                <i className='fab mx-2 fa-facebook'></i>
                <i className='fab mx-2 fa-twitter'></i>
                <i className='fab mx-2 fa-instagram'></i>
                <i className='fab mx-2 fa-spotify'></i>
                <i className='fab mx-2 fa-soundcloud'></i>



              </li>
            </ul>
            {props.userData !=null? <>
            <li className="nav-item">
              <span onClick={props.logOut} className="nav-link">Logout</span>
            </li>
            
            </>:<>
               <li className="nav-item">
              <Link className="nav-link" to="login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="register">Register</Link>
            </li>
            </>}
            

            


          </ul>

        </div>
      </nav>





    </>
  )
}
