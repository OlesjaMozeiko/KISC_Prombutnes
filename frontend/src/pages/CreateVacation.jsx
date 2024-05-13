import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';

const CreateVacation = () => {
    const [employees, setEmployees] = useState([]);
    const [vacationTypes, setVacationTypes] = useState([]);

    const [startDate, setStartDate] = useState([]);
    const [endDate, setEndDate] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [substitute, setSubstitute] = useState([]);
    const [type, setType] = useState([]);

    const navigate = useNavigate();

    const handleSave = () => {
        const data = {
            startDate,
            endDate,
            employee,
            substitute,
            type
        };

        console.log(data);

        axios.post('http://localhost:8000/vacation', data)
            .then(() => {
                navigate('/vacation');
            })
            .catch((error) => {
                alert('An error occured! Try again later!');
                console.log(error);
            })
    }

    const { isAuthenticated, userId } = useAuth();

    useEffect(() => {
        axios.get('http://localhost:8000/employee')
            .then((response) => {
                setEmployees(response.data.data);
                console.log(employees);
            })
            .catch((error) => {
                console.log(error);
            });

        axios.get('http://localhost:8000/vacationtype')
            .then((response) => {
                setVacationTypes(response.data.data);
                console.log(vacationTypes);
            })
            .catch((error) => {
                console.log(error);
            });

        setEmployee(userId);
    }, []);


    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Pievienot atvaļinājumu</h1>
            </div>

            <div className='flex flex-col p-4 border-slate-300'>
                <div className='my-4'>
                    <label className='block'>Sākuma datums</label>
                    <input type='date' className='border-2 border-slate-300' value={startDate} onChange={(e) => { setStartDate(e.target.value) }} />
                </div>

                <div className='my-4'>
                    <label className='block'>Beigu datums</label>
                    <input type='date' className='border-2 border-slate-300' value={endDate} onChange={(e) => { setEndDate(e.target.value) }} />
                </div>

                <div className='my-4'>
                    <label className='block'>Prombūtnes veids</label>
                    <select className='border-2 border-slate-300' onChange={(e) => { setType(e.target.value) }} required>
                        <option selected disabled value={''}>Izvēlne</option>
                        {vacationTypes.map((vacationType, index) => (
                            <option key={vacationType._id} value={vacationType._id}>{vacationType.name}</option>
                        ))}
                    </select>
                </div>

                <div className='my-4'>
                    <label className='block'>Aizvietotājs</label>
                    <select className='border-2 border-slate-300' onChange={(e) => { setSubstitute(e.target.value) }} required>
                        <option selected disabled value={''}>Izvēne</option>
                        {employees.map((employee, index) => (
                            <option key={employee._id} value={employee._id}>{`${employee.name} ${employee.surname}`}</option>
                        ))}
                    </select>
                </div>

                <div className='my-4'>
                    <button className=' p-2 bg-sky-600 text-white rounded-md' onClick={handleSave}>Saglabāt</button>
                </div>

            </div>
        </div>
    )

}

export default CreateVacation
