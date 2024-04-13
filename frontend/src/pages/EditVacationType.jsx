import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useAuth } from '../components/AuthProvider';

const EditVacationType = () => {
    const [userData, setUserData] = useState([]);
    const [vacationType, setVacationType] = useState({});

    const { id } = useParams();
    const { isAuthenticated, token, admin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated || !admin) {
            navigate('/vacationtype/show');
        }

        fetchData();

    }, []);

    async function fetchData() {

        await axios.get(`http://localhost:8000/vacationtype/${id}`)
            .then((response) => {
                setVacationType(response.data);
            })
            .catch((error) => {
                console.log(error);
            });


    }

    const handleSave = () => {
        const data = {
            ...vacationType
        };

        console.log(data);

        axios.put(`http://localhost:8000/vacationtype/${id}`, data)
            .then(() => {
                navigate('/vacationtype/show');
            })
            .catch((error) => {
                alert('An error occured! Try again later!');
                console.log(error);
            })
    }

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Rediģēt</h1>
            </div>

            <table className='border-collapse'>
                <tbody>
                    <tr>
                        <th className='border border-slate-300 p-2'>Vārds</th>
                        <td className='border border-slate-300 p-2'>
                            <input type='text' value={vacationType.name} onChange={(e) => {
                                setVacationType(prevState => ({
                                    ...prevState,
                                    name: e.target.value
                                })
                                )
                            }} />
                        </td>
                    </tr>

                </tbody>

            </table>

            <div className='flex gap-x-2 my-4'>
                <button onClick={handleSave} className='p-2 bg-sky-600 inline-block rounded-sm text-white'>Saglabāt</button>
            </div>


        </div>
    )
}

export default EditVacationType