import React, { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Register from './page/Register'
import Home from './page/Home'
import Login from './page/Login'
export default function App() {
  return(
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
    </Routes>
  )
}