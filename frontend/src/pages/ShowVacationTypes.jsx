import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

const ShowVacationTypes = () => {
    const [vacationTypes, setVacationTypes] = useState([]);
    const [newVacationType, setNewVacationType] = useState('');

    const navigate = useNavigate();

    const { isAuthenticated, token, admin } = useAuth();

    useEffect(() => {

        console.log('Auth ' + isAuthenticated);
        console.log("Admin " + admin);

        if (!isAuthenticated || !admin) {
            navigate('/vacation');
        }

        fetchData();


    }, []);

    async function fetchData() {
        await axios.get('http://localhost:8000/vacationtype')
            .then((response) => {
                setVacationTypes(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleSaveVacationType = () => {
        const data = {
            name: newVacationType
        };

        axios.post('http://localhost:8000/vacationtype', data)
            .then((response) => {
                setVacationTypes( [...vacationTypes, response.data] );
                setNewVacationType('');
            })
            .catch((error) => {
                alert('An error occured! Try again later!');
                console.log(error);
            })
    }

    const handleDeleteVacationType = (id) => {
        let ans = confirm('Are You Sure?');
        if (ans) {
            axios.delete(`http://localhost:8000/vacationtype/${id}`)
                .then(() => {
                    setVacationTypes(vacationTypes.filter(type => type._id !== id));
                })
                .catch((error) => {
                    alert('An error occured! Try again later!');
                    console.log(error);
                })
        }
    }


    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Prombūtņu veidi</h1>
            </div>
            <div className='my-2'>
                <input value={newVacationType} onChange={(e) => setNewVacationType(e.target.value)} className='border border-slate-300 p-2' />
                <button onClick={handleSaveVacationType} className='p-2 mx-2 bg-sky-600 inline-block rounded-sm text-white'>Pievienot</button>
            </div>
            <table className='border-collapse'>
                <thead>
                    <tr>
                        <th className='border border-slate-300 p-2'>Veids</th>
                        <th className='border border-slate-300 p-2' colSpan={2}>Darbība</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        vacationTypes.map((type) => (
                            <tr className='' key={type._id}>
                                <td className='border border-slate-300 p-2'>{type.name}</td>
                                <td className='border border-slate-300 p-2'><Link to={`/vacationtype/edit/${type._id}`}><AiOutlineEdit /></Link></td>
                                <td className='border cursor-pointer border-slate-300 p-2'><MdOutlineDelete onClick={(e) => { handleDeleteVacationType(type._id) }} /></td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>
        </div>
    )
}

export default ShowVacationTypes