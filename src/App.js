import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './Componnent/Navbar/Nav';
import Home from './Componnent/Home/Home';
import Login from './Componnent/Login/Login';
import People from './Componnent/People/People';
import Tv from './Componnent/Tv/Tv';
import Movies from './Componnent/Movies/Movies';
import Register from './Componnent/Register/Register';
import jwtDecode from 'jwt-decode';
import { useState } from 'react';
import { useEffect } from 'react';
import MovieDetails from './Componnent/ItemDetails/MovieDetails';
import TvDetails from './Componnent/ItemDetails/TvDetails';
import PersonDetails from './Componnent/ItemDetails/PersonDetails';

function App() {

  const [userData, setUserData] = useState(null);
  function saveUserData() {
    let encodedToken = localStorage.getItem("userToken")
    let decodedToken = jwtDecode(encodedToken)
    setUserData(decodedToken)
  }
  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      saveUserData();
    }
  }, [])
  function ProtectedRoute(props) {
    if (localStorage.getItem("userToken") == null) {
      return <Navigate to='/login' />
    }
    else {
      return props.children
    }
  }

  function logOut() {
    setUserData(null)
    localStorage.removeItem("userToken")
    return <Navigate to='/login' />
  }



  return (<>
    <Nav userData={userData} logOut={logOut} />
    <div className="container">
      <Routes>
        <Route path='/' element={<ProtectedRoute>   <Home />  </ProtectedRoute>} />
        <Route path='home' element={<ProtectedRoute>   <Home />  </ProtectedRoute>} />
        <Route path='login' element={<Login saveUserData={saveUserData} />} />
        <Route path='register' element={<Register />} />
        <Route path='people' element={<ProtectedRoute> <People /></ProtectedRoute>} />
        <Route path='tv' element={<ProtectedRoute> <Tv /></ProtectedRoute>} />
        <Route path='movies' element={<ProtectedRoute>  <Movies /> </ProtectedRoute>} />
        <Route path='moviedetails' element={<ProtectedRoute>  <MovieDetails /> </ProtectedRoute>} >
          <Route path=':id' element={<ProtectedRoute>  <MovieDetails /> </ProtectedRoute>} />
        </Route>
        <Route path='tvdetails' element={<ProtectedRoute>  <TvDetails /> </ProtectedRoute>} >
          <Route path=':id' element={<ProtectedRoute>  <TvDetails />  </ProtectedRoute>} />
        </Route>
        <Route path='persondetails' element={<ProtectedRoute>  <PersonDetails /> </ProtectedRoute>} >
          <Route path=':id' element={<ProtectedRoute>  <PersonDetails /> </ProtectedRoute>} />
        </Route>



      </Routes>
    </div>



  </>

  );
}

export default App;
