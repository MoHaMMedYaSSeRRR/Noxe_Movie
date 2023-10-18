import Axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'


export default function TvDetails() {

    let params = useParams()

    let [tvDetails, setTvDetails] = useState('')


    async function getTvDetails(id) {
        let { data } = await Axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=f04abd28a278b378a10634e8da13acc0&language=en-US`);
        setTvDetails(data)
    }
    useEffect(() => {
        getTvDetails(params.id)
    }, [])

    return (
        <>
            <div className="row mt-4">
                <div className="col-md-3">
                    <img className='w-100' src={'https://image.tmdb.org/t/p/w500' + tvDetails.poster_path} />
                </div>
                <div className="col-md-9" d-flex justify-content-center align-items-center >
                    <div>
                    <h1>{tvDetails.title} {tvDetails.name}</h1>
        <h3 className='textMuted'> {tvDetails.tagline}</h3>
        <div className='d-flex  p-2'>
          {tvDetails.genres?tvDetails.genres.map((item,index)=>(
              <div key={index} className='bg-light-main p-2 me-3'>{item.name}</div>
          )):''}
        </div>
        {tvDetails.vote_average?<h4 className='py-1'>Vote : {tvDetails.vote_average?.toFixed(1)}</h4>:''}
        {tvDetails.vote_count?<h4 className='py-1'>Vote count : {tvDetails.vote_count}</h4>:''}
        {tvDetails.release_date?<h4 className='py-1'>release date : {tvDetails.release_date}</h4>:''}
        {tvDetails.popularity?<h4 className='py-1'>popularity : {tvDetails.popularity}</h4>:''}
        {tvDetails.overview?<h5 className='py-1 textMuted'>{tvDetails.overview}</h5>:''}

                    </div>
                </div>

            </div>
        </>
    )
}

