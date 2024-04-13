import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import Spinner from '../components/Spinner';

const EditEvent = () => {
    const [event, setEvent] = useState([]);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const { isAuthenticated, token, admin } = useAuth();


    useEffect(() => {
        setLoading(true);
        console.log('Auth ' + isAuthenticated);
        console.log("Admin " + admin);

        if (!isAuthenticated || !admin) {
            navigate('/holiday');
        }

        axios.get(`http://localhost:8000/event/${id}`)
            .then((response) => {
                setEvent(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        setLoading(false);
    }, []);


    const handleSave = () => {
        const data = {
            ...event
        };

        console.log(data);

        axios.put(`http://localhost:8000/event/${id}`, data)
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
            <div className='flex justify-between items-center w-full'>
                <h1 className='text-3xl my-8'>Rediģēt pasākumu</h1>
            </div>
            {loading ? (<Spinner />) : (
                <div className='flex flex-col p-4 border-slate-300'>
                    <div className='my-4'>
                        <label className='block'>Sākuma datums</label>
                        <input type='date' className='border-2 border-slate-300' value={event.startDate?.split('T')[0]} onChange={(e) => {
                            setEvent(prevState => ({
                                ...prevState,
                                startDate: e.target.value
                            })
                            )
                        }} />
                    </div>

                    <div className='my-4'>
                        <label className='block'>Beigu datums</label>
                        <input type='date' className='border-2 border-slate-300' value={event.endDate?.split('T')[0]} onChange={(e) => {
                            setEvent(prevState => ({
                                ...prevState,
                                endDate: e.target.value
                            })
                            )
                        }} />
                    </div>

                    <div className='my-4'>
                        <label className='block'>Apraksts</label>
                        <textarea className='border-2 border-slate-300' value={event.description} onChange={(e) => {
                            setEvent(prevState => ({
                                ...prevState,
                                description: e.target.value
                            })
                            )
                        }} />
                    </div>

                    <div className='my-4'>
                        <button className=' p-2 bg-sky-600 text-white rounded-md' onClick={handleSave}>Saglabāt</button>
                    </div>

                </div>
            )}


        </div>
    )
}

export default EditEvent