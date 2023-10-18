import Axios from 'axios'
import React ,{useState} from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
  let [trendingMovie, setTrendingMovie] = useState([])
  let [trendingtv, setTrendingTv] = useState([])
  let [trendingPeople, setTrendingPeople] = useState([])


  async function getTrending (mediaType, callback ){
    let {data} = await Axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=f04abd28a278b378a10634e8da13acc0`);
    callback(data.results.slice(0,10));
  }
 useEffect(()=>{
  getTrending("movie" ,setTrendingMovie)
  getTrending("person" ,setTrendingPeople)
  getTrending("tv" ,setTrendingTv)

 } , [])

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
      <div className="row gy-4 mt-3">
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <div >
          <div className="brdr w-75 "></div>
          <h2 className='h4 mt-5'>Trending Tv <br /> To Watch Right Now</h2>
          <p className='textMuted py-2'>Most watched Tv by Days</p>
          <div className="brdr w-100"></div>
   
          </div>
          
        </div>
        {trendingtv.map((tv , i)=><div key={i} className='col-md-2' >
        <div className="person">
         <Link to={`/tvdetails/${tv.id}`}>
         <img src={'https://image.tmdb.org/t/p/w500'+tv.poster_path} className='w-100' />
          <h3 className='h6 my-2'> {tv.name} </h3>
         
         </Link>
        </div>
        </div>)}
      </div>
      <div className="row gy-4 mt-3">
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <div >
          <div className="brdr w-75 "></div>
          <h2 className='h4 mt-5'>Trending People <br /> To Watch Right Now</h2>
          <p className='lead textMuted py-2'>Most watched person by Days</p>
          <div className="brdr w-100 mt-3"></div>
   
          </div>
          
        </div>
        {trendingPeople.map((person , i)=><div key={i} className='col-md-2' >
        <div className="person">
        <Link to={`/persondetails/${person.id}`}>
          <img src={'https://image.tmdb.org/t/p/w500'+person.profile_path} className='w-100' />
          <h3 className='h6 my-2'> {person.original_name} </h3>
          </Link>
        </div>
        </div>)}
      </div>
    </>
  )
}
