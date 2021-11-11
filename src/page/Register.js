import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {register} from '../service/auth'

export default function Register() {
  const navigate = useNavigate()

  const [data, setData] = useState({
    username: '',
    password: '',
    email: ''
  })
  const [error, setError] = useState(null)
  

  const handleEdit = (event, param) => {
    const newData = {...data}
    newData[param] = event.target.value
    setData(newData)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    register(data)
    .then(res => res.json())
    .then(res => {
      console.log(res)
      //typo pada server jadi pakai statusCode 2000, bukan 200
      if(res.statusCode === 2000) {
        navigate('/')
      } else {
        console.log(res.statusCode)
        setError(res.errorMessage)
        setTimeout(() => setError(null), 3000)
      }
    })
  }

  return (
  <div className='flex flex-col justify-center items-center gap-5'>
  <h1 className='text-xl font-bold'>Register To Notes</h1>
   <form className='flex flex-col gap-5 items-center justify-center w-full' 
   onSubmit={(event) => handleSubmit(event)}>

    <div>
      <p>Name</p>
      <input className='border-2' type='text' value={data.username} onChange={(event) => handleEdit(event, 'username')}/>
    </div>

    <div>
      <p>Password</p>
      <input className='border-2' type='password' value={data.password} onChange={(event) => handleEdit(event, 'password')}/>
    </div>

    <div>
      <p>E-mail</p>
      <input className='border-2' type='email' value={data.email} onChange={(event) => handleEdit(event, 'email')}/>
    </div>

    <button type='submit' className='px-6 py-2 bg-green-50 border-2 text-center'>
      Submit
    </button>

   </form>
   <div className='flex justify-center mt-5'>
   {error && <p className='bg-gray text-red border-2 text-center px-3 text-red-500 w-1/2'>{error}</p>}

   </div>
  </div>

  )
}