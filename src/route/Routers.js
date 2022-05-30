import React, { useContext, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Addartis from '../pages/Addartis'
import Addmusic from '../pages/Addmusic'
import Home from '../pages/Home'
import Pay from '../pages/Pay'
import Transactions from '../pages/Transactions'
import Complain from '../pages/Complain'
import ComplainAdmin from '../pages/ComplanAdmin'
import { UserContext } from '../context/userContext'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Routers = () => {
  const [state] = useContext(UserContext)
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/pay' element={<Pay/>}/>
      <Route path='/add-music' element={<Addmusic/>}/>
      <Route path='/add-artis' element={<Addartis/>}/>
      <Route path='/transaction' element={<Transactions/>}/>
    </Routes>
    {state.isLogin? state?.user?.status === "admin"? <ComplainAdmin/> : <Complain/> :<></>}
    </>
  )
}

export default Routers