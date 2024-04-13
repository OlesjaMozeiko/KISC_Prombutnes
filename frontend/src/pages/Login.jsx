import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import { AiOutlineEye } from "react-icons/ai";

const Login = () => {
  const { isAuthenticated, login } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function submit(event){
    event.preventDefault();
    const data = {
      username,
      password
    };

    axios.post('http://localhost:8000/login', data)
      .then((response) => {
        //console.log(response);
        if(response.status == 200){
          login(response.data.token);
          console.log(response.data);
          navigate('/');
        }else{
          console.log({message: 'Server Error'});
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Autorizācija</h1>
      </div>
      <form onSubmit={submit} className='max-w-sm'>
        <div className='mb-5'>
          <label htmlFor="username" className='block mb-2 text-sm font-medium text-gray-900'>Lietotājvārds</label>
          <input value={username} onChange={(e) => {setUsername(e.target.value)}} type="text" id='username' className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:border-sky-600 block w-full p-2.5' />
        </div>

        <div className='mb-5'>
          <label htmlFor="password" className='block mb-2 text-sm font-medium text-gray-900'>Parole</label>
          <span className='relative'>
            <input value={password} onChange={(e) => {setPassword(e.target.value)}} type={showPassword ? 'text' : 'password'} id='password' className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:border-sky-600 block w-full p-2.5' />
            <AiOutlineEye onClick={ (e) => { setShowPassword(!showPassword) } } className='text-2xl absolute top-0 right-2 translate-y-1/2 cursor-pointer' />
          </span>
        </div>
        <button type='submit' className='text-white bg-sky-600 hover:bg-sky-700 font-medium rounded-lg text-sm px-5 py-2.5'>Login</button>
      </form>
    </div>
  )

}

export default Login