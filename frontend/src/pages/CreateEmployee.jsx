import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';

const CreateEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [positions, setPositions] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [position, setPosition] = useState('');
    const [department, setDepartment] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const { isAuthenticated, token, admin } = useAuth();
    
    

    const handleSave = () => {
        const data = {
            name,
            surname,
            position,
            department,
            username,
            password
        };

        console.log(data);

        axios.post('http://localhost:8000/employee', data)
            .then(() => {
                navigate('/employee');
            })
            .catch((error) => {
                alert('An error occured! Try again later!');
                console.log(error);
            })
    }
    

    useEffect(() => {

        console.log('Auth ' + isAuthenticated);
        console.log("Admin "+admin);

        if(!isAuthenticated || !admin){
            navigate('/employee');
        }

        fetchData();

        //setInitialData();
    }, []);

    async function fetchData(){
        await axios.get('http://localhost:8000/employee')
            .then((response) => {
                setEmployees(response.data.data);
            })
            .catch((error) =>{
                console.log(error);
            });
        
            await axios.get('http://localhost:8000/department')
            .then((response) => {
                setDepartments(response.data.data);
            })
            .catch((error) =>{
                console.log(error);
            });
        
            await axios.get('http://localhost:8000/position')
            .then((response) => {
                setPositions(response.data.data);
            })
            .catch((error) =>{
                console.log(error);
            });

            setPosition(positions[0]?._id);
        setDepartment(departments[0]?._id);
    }

    const setInitialData = () => {
        setPosition(positions[0]?._id);
        setDepartment(departments[0]?._id);
    }


  return (
    <div className='p-4'>
        <div className='flex justify-between items-center'>
            <h1 className='text-3xl my-8'>Pievienot darbinieku</h1>
        </div>

        <div className='flex flex-col p-4 border-slate-300'>
            <div className='my-4'>
                <label className='block'>Lietotājvārds</label>
                <input type='text' className='border-2 border-slate-300' value={username} onChange={(e) => {setUsername(e.target.value)}}/>
            </div>

            <div className='my-4'>
                <label className='block'>Vārds</label>
                <input type='name' className='border-2 border-slate-300' value={name} onChange={(e) => {setName(e.target.value)}}/>
            </div>

            <div className='my-4'>
                <label className='block'>Uzvārds</label>
                <input type='name' className='border-2 border-slate-300' value={surname} onChange={(e) => {setSurname(e.target.value)}}/>
            </div>

            <div className='my-4'>
                <label className='block'>Nodaļa/grupa</label>
                <select value={department} className='border-2 border-slate-300' onChange={(e) => {setDepartment(e.target.value)}} required>
                    <option disabled value={''}>Izvēlne</option>
                    {departments.map((c_department, index) => (
                        <option key={c_department._id} value={c_department._id}>{c_department.name}</option>
                    ))}
                </select>
            </div>

            <div className='my-4'>
                <label className='block'>Amats</label>
                <select value={position} className='border-2 border-slate-300' onChange={(e) => {setPosition(e.target.value)}} required>
                <option disabled value={''} >Izvēlne</option>
                    {positions.map((c_position, index) => (
                        <option key={c_position._id} value={c_position._id}>{c_position.name}</option>
                    ))}
                </select>
            </div>

            <div className='my-4'>
                <label className='block'>Parole</label>
                <input type='password' className='border-2 border-slate-300' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
            </div>

            <div className='my-4'>
                <button className=' p-2 bg-sky-600 text-white rounded-md' onClick={handleSave}>Saglabāt</button>
            </div>

        </div>
    </div>
  )

}

export default CreateEmployee
