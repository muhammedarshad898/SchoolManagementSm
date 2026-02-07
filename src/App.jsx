import { useState } from 'react'

import './App.css'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Landing from './pages/Landing'
import { Route,Routes } from 'react-router-dom'
import './bootstrap.min (3).css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  

  return (
    <>
     <Routes>
      <Route path='/' element={<Landing/>}></Route>
      <Route path='/auth' element={<Auth/>}></Route>
      <Route path='/dash' element={<Dashboard/>}></Route>
      </Routes> 
      <ToastContainer/>
      
    </>
  )
}

export default App
