import Axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'


export default function PersonDetails() {

    let params = useParams()

    let [personDetails, setPersonDetails] = useState('')


    async function getPersonDetails(id) {
        let { data } = await Axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=f04abd28a278b378a10634e8da13acc0&language=en-US`);
        setPersonDetails(data)
    }
    useEffect(() => {
        getPersonDetails(params.id)
    }, [])

    return (
        <>
            <div className="row mt-4">
                <div className="col-md-3">
                    <img className='w-100' src={'https://image.tmdb.org/t/p/w500' + personDetails.profile_path} />
                </div>
                <div className="col-md-9" d-flex justify-content-center align-items-center >
                    <div>
                        {personDetails.name ? <h1 className='pb-3' >{personDetails.name}</h1> : ''}
                        {personDetails.birthday ? <h4 className='pb-2'>Birth Day: {personDetails.birthday}</h4> : ''}
                        {personDetails.place_of_birth ? <h4>Place Of Birth: {personDetails.place_of_birth}</h4> : ''}
                        {personDetails.popularity ? <h4 className='py-1'>popularity : {personDetails.popularity}</h4> : ''}
                        {personDetails.biography ? <h5 className='textMuted'>{personDetails.biography.slice(0, 700)}</h5> : ''}

                    </div>
                </div>

            </div>
        </>
    )
}

