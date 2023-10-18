import Axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
export default function MovieDetails() {

    let params = useParams()

    let [movieDetails, setMovieDetails] = useState('')


    async function getMovieDetails(id) {
        let { data } = await Axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=f04abd28a278b378a10634e8da13acc0&language=en-US`);
        setMovieDetails(data)
    }
    useEffect(() => {
        getMovieDetails(params.id)
    }, [])

    return (
        <>
            <div className="row mt-4">
                <div className="col-md-3">
                    <img className='w-100' src={'https://image.tmdb.org/t/p/w500' + movieDetails.poster_path} />
                </div>
                <div className="col-md-9" d-flex justify-content-center align-items-center >
                    <div>
                        <h1>{movieDetails.title}</h1>
                        <h3 className='textMuted'> {movieDetails.tagline}</h3>
                        <div className='d-flex py-4 px-2'>
                            {movieDetails.genres ? movieDetails.genres.map((item, index) => (
                                <div key={index} className='bg-light-main p-2 me-3'>{item.name}</div>
                            )) : ''}
                        </div>
                        {movieDetails.vote_average ? <h4 className='py-1'>Vote : {movieDetails.vote_average?.toFixed(1)}</h4> : ''}
                        {movieDetails.vote_count ? <h4 className='py-1'>Vote count : {movieDetails.vote_count}</h4> : ''}
                        {movieDetails.release_date ? <h4 className='py-1'>release date : {movieDetails.release_date}</h4> : ''}
                        {movieDetails.popularity ? <h4 className='py-1'>popularity : {movieDetails.popularity}</h4> : ''}
                        {movieDetails.overview ? <h5 className='py-1 textMuted'>{movieDetails.overview}</h5> : ''}
                    </div>
                </div>

            </div>
        </>
    )
}
