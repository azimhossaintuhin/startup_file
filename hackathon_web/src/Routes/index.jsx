import React from 'react'
import { BrowserRouter, Routes , Route} from 'react-router-dom'
// importing all the components here
import Login from '../pages/Auth/Login'



const Router = () => {
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Login/>} />
  </Routes>
  
  </BrowserRouter>
  )
}

export default Router