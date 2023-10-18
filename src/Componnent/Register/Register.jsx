import React, { useState } from 'react'
import Axios from 'axios'
import Joi from 'joi'
import { useNavigate } from 'react-router-dom'
export default function Register() {

  let navigate =useNavigate()
  let [errorList, setErrorList] = useState([])
  let [isloading, setIsLoading] = useState(false)
  let [error, setError] = useState('')
  let [user, setUser] = useState({
    first_name: '',
    last_name: '',
    age: '',
    email: '',
    password: ''

  })
  function getUserData(e) {
    let myUser = { ...user }
    myUser[e.target.name] = e.target.value
    setUser(myUser)
  }

  async function submitRegisterForm(e) {
    e.preventDefault();
    setIsLoading(true)
    let validation = validateRegisterForm();
    if (validation.error) {
      console.log(validation.error.details)
      setErrorList(validation.error.details)
      setIsLoading(false)
    }
    else {
      let { data } = await Axios.post('https://movies-api.routemisr.com/signup', user)

      if (data.message === 'success') {

        setIsLoading(false)
        navigate("/login")
      }
      else {
        setError(data.message)
        setIsLoading(false)
      }
    }
  }

  function validateRegisterForm() {
    let scheme = Joi.object({
      first_name: Joi.string().min(3).max(10).required(),
      last_name: Joi.string().min(3).max(10).required(),
      age: Joi.number().min(16).max(80).required(),
      email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string(),
    });
    return scheme.validate(user, { abortEarly: false });
  }



  return (
    <>
      <div className="w-75 mx-auto mt-2">
        <h1>Register Now</h1>
        {errorList.map((error)=><div className='alert alert-danger'>{error.message}</div>)}
        {error ? <div className='alert alert-danger'>{error}</div> : ''}
        <form onSubmit={submitRegisterForm}>
          <label htmlFor="first_name" className='mt-3'> First Name : </label>
          <input onChange={getUserData} type="text" className='form-control' id='first_name' name='first_name' />

          <label htmlFor="last_name" className='mt-3'> Last Name : </label>
          <input onChange={getUserData} type="text" className='form-control' id='last-name' name='last_name' />

          <label htmlFor="age" className='mt-3'> Age : </label>
          <input onChange={getUserData} type="number" className='form-control' id='age' name='age' />

          <label htmlFor="email" className='mt-3'> Email : </label>
          <input onChange={getUserData} type="email" className='form-control' id='email' name='email' />

          <label htmlFor="password" className='mt-3'> Password : </label>
          <input onChange={getUserData} type="password" className='form-control' id='password' name='password' />

          <button type='submit' className='btn btn-outline-info mt-3 '>
          {isloading ==true ? <i className='fas fa-spinner fa-spin'></i>:'Register'}
          </button>


        </form>

      </div>

    </>
  )
}
