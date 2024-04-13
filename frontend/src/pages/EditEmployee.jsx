import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useAuth } from '../components/AuthProvider';

const EditEmployee = () => {
    //const [token, setToken] = useState('');
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [employee, setEmployee] = useState([]);
    const [positions, setPositions] = useState([]);
    const [departments, setDepartments] = useState([]);

    /*const [name, setName] = useState(employee.name);
    const [surname, setSurname] = useState(employee.surname);
    const [position, setPosition] = useState(employee.position);
    const [department, setDepartment] = useState(employee.department);
    //const [username, setUsername] = useState('');
    //const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(employee.isAdmin);*/

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

        await axios.get(`http://localhost:8000/employee/${id}`)
            .then((response) => {
                setEmployee(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        await axios.get('http://localhost:8000/department')
            .then((response) => {
                setDepartments(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });

        await axios.get('http://localhost:8000/position')
            .then((response) => {
                setPositions(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleSave = () => {
        const data = {
            ...employee
        };

        console.log(data);

        axios.put(`http://localhost:8000/employee/${id}`, data)
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
                <h1 className='text-3xl my-8'>Rediģēt</h1>
            </div>
            {loading ? (<Spinner />) : (

                <table className='border-collapse'>
                    <tbody>
                        <tr>
                            <th className='border border-slate-300 p-2'>Vārds</th>
                            <td className='border border-slate-300 p-2'>
                                <input type='text' value={employee.name} onChange={(e) => {
                                            setEmployee(prevState => ({
                                                ...prevState,
                                                name: e.target.value
                                            })
                                            )
                                        }}/>
                            </td>
                        </tr>
                        <tr>
                            <th className='border border-slate-300 p-2'>Uzvārds</th>
                            <td className='border border-slate-300 p-2'>
                                <input type='text' value={employee.surname} onChange={(e) => {
                                            setEmployee(prevState => ({
                                                ...prevState,
                                                surname: e.target.value
                                            })
                                            )
                                        }} />
                            </td>
                        </tr>
                        <tr>
                            <th className='border border-slate-300 p-2'>Nodaļa/grupa</th>
                            <td className='border border-slate-300 p-2'>
                                <select value={employee.department} onChange={(e) => {
                                            setEmployee(prevState => ({
                                                ...prevState,
                                                department: e.target.value
                                            })
                                            )
                                        }}>
                                    {departments.map((department, index) => (
                                        <option key={department._id} value={department._id}> {department.name} </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th className='border border-slate-300 p-2'>Amats</th>
                            <td className='border border-slate-300 p-2'>
                                <select value={employee.position} onChange={(e) => {
                                            setEmployee(prevState => ({
                                                ...prevState,
                                                position: e.target.value
                                            })
                                            )
                                        }}>
                                    {positions.map((position, index) => (
                                        <option key={position._id} value={position._id}> {position.name} </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th className='border border-slate-300 p-2' >Admin</th>
                            <td className='border border-slate-300 p-2'>
                                <select value={employee.isAdmin} onChange={(e) => {
                                            setEmployee(prevState => ({
                                                ...prevState,
                                                isAdmin: e.target.value
                                            })
                                            )
                                        }}>
                                    <option value={true}>Jā</option>
                                    <option value={false}>Nē</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>

                </table>
            )}
            <div className='flex gap-x-2 my-4'>
                <button onClick={handleSave} className='p-2 bg-sky-600 inline-block rounded-sm text-white'>Saglabāt</button>
            </div>

        </div>
    )
}

export default EditEmployee