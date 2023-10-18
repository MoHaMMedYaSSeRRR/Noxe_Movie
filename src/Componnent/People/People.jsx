import Axios  from 'axios';
import React, { useEffect , useState } from 'react'
import { Link } from 'react-router-dom';

export default function People() {
  let[trendingPeople , setTrendingPeople]=useState([])

  async function getTrendingPeople() {
     let {data} = await Axios.get(`https://api.themoviedb.org/3/trending/person/week?api_key=f04abd28a278b378a10634e8da13acc0`);
     setTrendingPeople(data.results)
   }
   useEffect(()=> { 
    getTrendingPeople()
   }
   ,[])

 return (
   <>
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

