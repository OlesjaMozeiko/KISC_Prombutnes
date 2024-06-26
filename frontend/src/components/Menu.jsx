import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useAuth } from './AuthProvider';
import { GiExitDoor } from "react-icons/gi";
import { BsBoxArrowInRight } from 'react-icons/bs';

function Menu() {
  const { isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    
    <div className='flex flex-col gap-4 p-8 border-r-2 max-h-screen sticky top-0 bg-sky-50'>
      <div className='text-3xl mt-4'><Link to={'/'}>Sākumlapa</Link></div>
      <div className='text-3xl'><Link to={'/employee'}>Darbinieku saraksts</Link></div>
      <div className='text-3xl'><Link to={'/vacation'}>Prombūtņu kalendārs</Link></div>
      <div className='text-3xl'><Link to={'/holiday'}>Svētki un pasākumi</Link></div>
      
      {
        isAuthenticated ? (<div className='cursor-pointer text-5xl mt-auto' onClick={handleLogout}><BsBoxArrowInRight /></div>)
          : (<div className='text-3xl mt-auto'><Link to={'/login'}>Pieslēgties</Link></div>)
      }

    </div>
    
  )
}

export default Menu