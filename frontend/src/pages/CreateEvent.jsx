import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';

const CreateEvent = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const { isAuthenticated, token, admin } = useAuth();

    useEffect(() => {

        console.log('Auth ' + isAuthenticated);
        console.log("Admin " + admin);

        if (!isAuthenticated || !admin) {
            navigate('/holiday');
        }

    }, []);

    const handleSave = () => {
        const data = {
            startDate,
            endDate,
            description
        };

        console.log(data);

        axios.post('http://localhost:8000/event', data)
            .then(() => {
                navigate('/holiday');
            })
            .catch((error) => {
                alert('An error occured! Try again later!');
                console.log(error);
            })
    }


    return (
        <div className='p-4'>
        <div className='flex justify-between items-center'>
            <h1 className='text-3xl my-8'>Pievienot pasākumu</h1>
        </div>

        <div className='flex flex-col p-4 border-slate-300'>
            <div className='my-4'>
                <label className='block'>Sākuma datums</label>
                <input type='date' className='border-2 border-slate-300' value={startDate} onChange={(e) => {setStartDate(e.target.value)}}/>
            </div>

            <div className='my-4'>
                <label className='block'>Beigu datums</label>
                <input type='date' className='border-2 border-slate-300' value={endDate} onChange={(e) => {setEndDate(e.target.value)}}/>
            </div>

            <div className='my-4'>
                <label className='block'>Apraksts</label>
                <textarea className='border-2 border-slate-300' value={description} onChange={(e) => {setDescription(e.target.value)}}></textarea>
            </div>

            <div className='my-4'>
                <button className=' p-2 bg-sky-600 text-white rounded-md' onClick={handleSave}>Saglabāt</button>
            </div>

        </div>
    </div>
    )
}

export default CreateEvent