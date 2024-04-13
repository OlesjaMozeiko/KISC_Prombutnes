import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useAuth } from '../components/AuthProvider';

const ShowVacation = () => {
    //const [token, setToken] = useState('');
    const [userData, setUserData] = useState([]);

    const [vacation, setVacation] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [substitute, setSubstitute] = useState([]);
    const [type, setType] = useState([]);
    const [loading, setLoading] = useState(false);

    const [employees, setEmployees] = useState([]);
    const [vacationTypes, setVacationTypes] = useState([]);

    const { id } = useParams();

    const navigate = useNavigate();


    async function fetchData() {
        try {
            setLoading(true);

            const vacationResponse = await axios.get(`http://localhost:8000/vacation/${id}`);
            const vacationData = vacationResponse.data;
            setVacation(vacationData);

            const employeeResponse = await axios.get(`http://localhost:8000/employee/${vacationData.employee}`);
            setEmployee(employeeResponse.data);

            const substituteResponse = await axios.get(`http://localhost:8000/employee/${vacationData.substitute}`);
            setSubstitute(substituteResponse.data);

            const typeResponse = await axios.get(`http://localhost:8000/vacationtype/${vacationData.type}`);
            setType(typeResponse.data);

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }

    const { isAuthenticated, token } = useAuth();
    useEffect(() => {
        //const token = localStorage.getItem('jwt-token');
        //setToken(token);
        fetchData();

        axios.post('http://localhost:8000/auth', { jwt: token })
            .then((response) => {
                if (response.status == 200) {
                    setUserData(response.data);
                }
            });

        axios.get('http://localhost:8000/employee')
            .then((response) => {
                setEmployees(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });

        axios.get('http://localhost:8000/vacationtype')
            .then((response) => {
                setVacationTypes(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })


    }, [token]);

    //async function fetchData

    function formatDateFromISO(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // добавляем ведущий ноль, если месяц состоит из одной цифры
        const day = String(date.getDate()).padStart(2, '0'); // добавляем ведущий ноль, если день состоит из одной цифры
        return `${year}/${month}/${day}`;
    }

    const handleSave = () => {
        const data = {
            ...vacation
        };

        console.log(data);

        axios.put(`http://localhost:8000/vacation/${vacation._id}`, data)
            .then(() => {
                navigate('/vacation');
            })
            .catch((error) => {
                alert('An error occured! Try again later!');
                console.log(error);
            })
    }

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/vacation/${vacation._id}`)
            .then(() => {
                navigate('/vacation');
            })
            .catch((error) => {
                alert('An error occured! Try again later!');
                console.log(error);
            })
    }

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Parādīt prombūtni</h1>
            </div>
            {loading ? (<Spinner />) : (

                <table className='border-collapse'>
                    {
                        userData && userData.isAdmin ? (

                            <tbody>
                                <tr>
                                    <th className='border border-slate-300 p-2'>Sākuma datums</th>
                                    <td className='border border-slate-300 p-2'>
                                        <input type='date' value={vacation.startDate.split('T')[0]} onChange={
                                            (e) => {
                                                setVacation(prevState => ({
                                                    ...prevState,
                                                    startDate: e.target.value
                                                })
                                                )
                                            }} />
                                    </td>
                                </tr>
                                <tr>
                                    <th className='border border-slate-300 p-2'>Beigu datums</th>
                                    <td className='border border-slate-300 p-2'>
                                        <input type='date' value={vacation.endDate.split('T')[0]} onChange={
                                            (e) => {
                                                setVacation(prevState => ({
                                                    ...prevState,
                                                    endDate: e.target.value
                                                })
                                                )
                                            }} />
                                    </td>
                                </tr>
                                <tr>
                                    <th className='border border-slate-300 p-2'>Darbinieks</th>
                                    <td className='border border-slate-300 p-2'>
                                        <select value={vacation.employee} onChange={(e) => {
                                            setVacation(prevState => ({
                                                ...prevState,
                                                employee: e.target.value
                                            })
                                            )
                                        }}>
                                            {employees.map((employee, index) => (
                                                <option key={employee._id} value={employee._id}> {`${employee.name} ${employee.surname}`} </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th className='border border-slate-300 p-2'>Aizvietotājs</th>
                                    <td className='border border-slate-300 p-2'>
                                        <select value={vacation.substitute} onChange={(e) => {
                                            setVacation(prevState => ({
                                                ...prevState,
                                                substitute: e.target.value
                                            })
                                            )
                                        }}>
                                            {employees.map((employee, index) => (
                                                <option key={employee._id} value={employee._id}> {`${employee.name} ${employee.surname}`} </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th className='border border-slate-300 p-2'>Veids</th>
                                    <td className='border border-slate-300 p-2'>
                                        <select value={vacation.type} onChange={(e) => {
                                            setVacation(prevState => ({
                                                ...prevState,
                                                type: e.target.value
                                            })
                                            )
                                        }}>
                                            {vacationTypes.map((vacationType, index) => (
                                                <option key={vacationType._id} value={vacationType._id}>{vacationType.name}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th className='border border-slate-300 p-2' >Saskaņots</th>
                                    <td className='border border-slate-300 p-2'>
                                        <select value={vacation.approved} onChange={(e) => {
                                            setVacation(prevState => ({
                                                ...prevState,
                                                approved: e.target.value
                                            })
                                            )
                                        }}>
                                            <option value={true}>Jā</option>
                                            <option value={false}>Nē</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>


                        )
                            : (
                                <tbody>
                                    <tr>
                                        <th className='border border-slate-300 p-2'>Sākuma datums</th>
                                        <td className='border border-slate-300 p-2'>{formatDateFromISO(vacation.startDate)}</td>
                                    </tr>
                                    <tr>
                                        <th className='border border-slate-300 p-2'>Beigu datums</th>
                                        <td className='border border-slate-300 p-2'>{formatDateFromISO(vacation.endDate)}</td>
                                    </tr>
                                    <tr>
                                        <th className='border border-slate-300 p-2'>Darbinieks</th>
                                        <td className='border border-slate-300 p-2'>{employee.name}</td>
                                    </tr>
                                    <tr>
                                        <th className='border border-slate-300 p-2'>Aizvietotājs</th>
                                        <td className='border border-slate-300 p-2'>{substitute?.name}</td>
                                    </tr>
                                    <tr>
                                        <th className='border border-slate-300 p-2'>Veids</th>
                                        <td className='border border-slate-300 p-2'>{type?.name}</td>
                                    </tr>
                                    <tr>
                                        <th className='border border-slate-300 p-2' >Saskaņots</th>
                                        <td className='border border-slate-300 p-2'>{vacation.approved ? 'Yes' : 'No'}</td>
                                    </tr>
                                </tbody>
                            )
                    }

                </table>
            )}
            {(vacation.approved || userData.isAdmin) ? ('') : (<h3 className='mt-2 text-lg font-semibold'>Contact administrator to approve vacation!</h3>)}
            {userData?.isAdmin ? (
                <div className='flex gap-x-2 my-4'>
                    <button onClick={handleSave} className='p-2 bg-sky-600 inline-block rounded-sm text-white'>Salabāt</button>
                    <button onClick={handleDelete} className='p-2 bg-red-600 inline-block rounded-sm text-white'>Dzēst</button>
                </div>
            ) : ('')}

        </div>
    )
}

export default ShowVacation