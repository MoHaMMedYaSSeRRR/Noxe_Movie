import Axios  from 'axios';
import React, { useEffect , useState } from 'react'
import { Link } from 'react-router-dom';


export default function Movies() {

    let[trendingMovie , setTrendingMovie]=useState([])

   async function getTrendingMovie() {
      let {data} = await Axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=f04abd28a278b378a10634e8da13acc0`);
      setTrendingMovie(data.results)
    }
    useEffect(()=> { 
        getTrendingMovie()
    }
    ,[])

  return (
    <>
      <div className="row gy-4">
      <div className="col-md-4 d-flex justify-content-center align-items-center">
          <div >
          <div className="brdr w-75 "></div>
          <h2 className='h4 mt-5'>Trending Movies <br /> To Watch Right Now</h2>
          <p className='textMuted py-2'>Most watched Movies by Days</p>
          <div className="brdr w-100"></div>
          </div>
        </div>

      

      {trendingMovie.map((movie , i)=><div key={i} className='col-md-2' >
        <div className="person">
          <Link to={`/moviedetails/${movie.id}`}>
          <img src={'https://image.tmdb.org/t/p/w500'+movie.poster_path} className='w-100' />
          <h3 className='h6 my-2'> {movie.title} </h3>
          </Link>
        </div>
        </div>)}

    </div>
    </>
  )
}
