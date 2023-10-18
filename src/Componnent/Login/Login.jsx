import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Joi from 'joi'
import { useNavigate } from 'react-router-dom'


export default function Login(props) {

  let navigate = useNavigate()
  let [errorList, setErrorList] = useState([])
  let [isloading, setIsLoading] = useState(false)
  let [error, setError] = useState('')
  let [user, setUser] = useState({
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
      let { data } = await Axios.post('https://movies-api.routemisr.com/signin', user)

      if (data.message === 'success') {
        localStorage.setItem("userToken", data.token)
        props.saveUserData()
        setIsLoading(false)
        navigate("/home")
      }
      else {
        setError(data.message)
        setIsLoading(false)
      }
    }
  }
  useEffect(()=>{
    if(localStorage.getItem("userToken"))
    {
      navigate('/home')
    }
  },[])


  function validateRegisterForm() {
    let scheme = Joi.object({
      email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string(),
    });
    return scheme.validate(user, { abortEarly: false });
  }



  return (
    <>
      <div className="w-75 mx-auto mt-2">
        <h1>Login now</h1>
        {errorList.map((error ,i) => <div key={i} className='alert alert-danger'>{error.message}</div>)}
        {error ? <div className='alert alert-danger'>{error}</div> : ''}
        <form onSubmit={submitRegisterForm}>
          <label htmlFor="email" className='mt-3'> Email : </label>
          <input onChange={getUserData} type="email" className='form-control' id='email' name='email' />

          <label htmlFor="password" className='mt-3'> Password : </label>
          <input onChange={getUserData} type="password" className='form-control' id='password' name='password' />

          <button type='submit' className='btn btn-outline-info mt-3 '>
            {isloading == true ? <i  className='fas fa-spinner fa-spin'></i> : 'Login'}
          </button>


        </form>

      </div>

    </>
  )
}

