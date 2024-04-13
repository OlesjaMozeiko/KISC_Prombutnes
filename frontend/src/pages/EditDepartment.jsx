import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useAuth } from '../components/AuthProvider';

const EditDepartment = () => {
    const [userData, setUserData] = useState([]);
    const [department, setDepartment] = useState({});

    const { id } = useParams();
    const { isAuthenticated, token, admin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated || !admin) {
            navigate('/employee');
        }

        fetchData();

    }, []);

    async function fetchData() {

        await axios.get(`http://localhost:8000/department/${id}`)
            .then((response) => {
                setDepartment(response.data);
            })
            .catch((error) => {
                console.log(error);
            });


    }

    const handleSave = () => {
        const data = {
            ...department
        };

        console.log(data);

        axios.put(`http://localhost:8000/department/${id}`, data)
            .then(() => {
                navigate('/employee');
            })
            .catch((error) => {
                alert('An error occured! Try again later!');
                console.log(error);
            })
    }

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Rediģēt nodaļu/grupu</h1>
            </div>

            <table className='border-collapse'>
                <tbody>
                    <tr>
                        <th className='border border-slate-300 p-2'>Nosaukums</th>
                        <td className='border border-slate-300 p-2'>
                            <input type='text' value={department.name} onChange={(e) => {
                                setDepartment(prevState => ({
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

export default EditDepartment