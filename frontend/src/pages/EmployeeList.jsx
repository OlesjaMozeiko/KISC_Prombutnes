import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { useAuth } from '../components/AuthProvider';
//import { Department } from '../../../backend/models/departmentModel';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);

  const [newDepartment, setNewDepartment] = useState('');
  const [newPosition, setNewPosition] = useState('');

  const [showPositions, setShowPositions] = useState(false);
  const [showDepartments, setShowDepartments] = useState(false);

  const { isAuthenticated, token } = useAuth();

  const navigate = useNavigate();

  async function fetchData() {
    await axios.get('http://localhost:8000/employee')
      .then((response) => {
        setEmployees(response.data.data);
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

  useEffect(() => {
    setLoading(true);

    axios.post('http://localhost:8000/auth', { jwt: token })
      .then((response) => {
        if (response.status == 200) {
          setUserData(response.data);
        }
      });

    fetchData();
    setLoading(false);

  }, [token]);


  const handleDelete = (id) => {
    let ans = confirm('Are You Sure?');
    if (ans) {
      axios.delete(`http://localhost:8000/employee/${id}`)
        .then(() => {
          setEmployees(employees.filter(employee => employee._id !== id));
        })
        .catch((error) => {
          alert('An error occured! Try again later!');
          console.log(error);
        })
    }
  }

  function employeeDepartmentName(depId) {
    for (let i = 0; i < departments.length; i++) {
      if (departments[i]._id == depId) {
        return departments[i].name;
      }
    }
  }

  function employeePositionName(posId) {
    for (let i = 0; i < positions.length; i++) {
      if (positions[i]._id == posId) {
        return positions[i].name;
      }
    }
  }

  const handleSaveDepartment = () => {
    const data = {
      name: newDepartment
    };

    console.log(data);

    axios.post('http://localhost:8000/department', data)
      .then((response) => {
        //navigate('/employee');
        setDepartments([...departments, response.data]);
        setNewDepartment('');
      })
      .catch((error) => {
        alert('An error occured! Try again later!');
        console.log(error);
      })
  }

  const handleSavePosition = () => {
    const data = {
      name: newPosition
    };

    console.log(data);

    axios.post('http://localhost:8000/position', data)
      .then((response) => {
        setPositions([...positions, response.data]);
        setNewPosition('');
      })
      .catch((error) => {
        alert('An error occured! Try again later!');
        console.log(error);
      })
  }

  const handleDeleteDepartment = (id) => {
    let ans = confirm('Are You Sure?');
    if (ans) {
      axios.delete(`http://localhost:8000/department/${id}`)
        .then(() => {
          setDepartments(departments.filter(department => department._id !== id));
        })
        .catch((error) => {
          alert('An error occured! Try again later!');
          console.log(error);
        })
    }
  }

  const handleDeletePosition = (id) => {
    let ans = confirm('Are You Sure?');
    if (ans) {
      axios.delete(`http://localhost:8000/position/${id}`)
        .then(() => {
          setPositions(positions.filter(position => position._id !== id));
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
        <h1 className='text-3xl my-8'>Darbinieku saraksts</h1>

        {
          (userData.isAdmin) ? (
            <Link to={'/employee/create'}>
              <MdOutlineAddBox className='text-3xl text-sky-600' />
            </Link>

          )
            : ('')
        }
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-collapse'>
          <thead>
            <tr>
              <th className='border border-slate-300 p-2'>Vārds</th>
              <th className='border border-slate-300 p-2'>Uzvārds</th>
              <th className='border border-slate-300 p-2'>Nodaļa/grupa</th>
              <th className='border border-slate-300 p-2'>Amats</th>
              {
                (userData.isAdmin) ? (<th className='border border-slate-300 p-2'>Darbība</th>)
                  : ('')
              }
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (

              <tr key={employee._id} className='h-8 hover:bg-gray-100'>

                <td className='border border-slate-300 text-center p-2'>{employee.name}</td>
                <td className='border border-slate-300 text-center p-2'>{employee.surname}</td>
                <td className='border border-slate-300 text-center p-2'>{employeeDepartmentName(employee.department)}</td>
                <td className='border border-slate-300 text-center p-2'>{employeePositionName(employee.position)}</td>

                {
                  isAuthenticated && userData.isAdmin ? (<td className='border border-slate-300 text-center p-2'>
                    <div className='flex justify-center gap-x-4'>
                      <MdOutlineDelete className='cursor-pointer' onClick={(e) => { handleDelete(employee._id) }} />
                      <Link to={`/employee/edit/${employee._id}`}>
                        <AiOutlineEdit />
                      </Link>
                    </div>
                  </td>)
                    : ('')
                }

              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className='flex items-start justify-self-start gap-10'>
        <div className='inline-flex flex-col flex-1'>
          <div className='border-b-2 border-slate-300 flex justify-between items-center' onClick={(e) => {setShowDepartments(!showDepartments)}}>
            <h1 className='text-3xl my-8 flex'>Nodaļas/grupas</h1>
            <IoIosArrowDown className='text-2xl' />
          </div>
          <div className={showDepartments ? 'block' : 'hidden'}>
            {
              (userData.isAdmin) ? (
                <div className='my-2'>
                  <input value={newDepartment} onChange={(e) => setNewDepartment(e.target.value)} className='border border-slate-300 p-2' />
                  <button onClick={handleSaveDepartment} className='p-2 bg-sky-600 inline-block rounded-sm text-white'>Pievienot</button>
                </div>

              )
                : ('')
            }

            <div className='my-2'>
              {
                departments.map((department) => (
                  <div key={department._id} className='border relative rounded-md shadow-md mb-4 p-4 bg-sky-50'>
                    {department.name}
                    {
                      (userData.isAdmin) ? (
                        <div className='absolute right-4 top-1/2 -translate-y-1/2 flex gap-2 align-middle'>
                          <Link to={`/department/edit/${department._id}`}><AiOutlineEdit className='cursor-pointer'/></Link>
                          <MdOutlineDelete className='cursor-pointer' onClick={(e) => { handleDeleteDepartment(department._id) }} />
                        </div>
                      )
                        : ('')
                    }
                  </div>
                ))
              }
            </div>
          </div>
        </div>

        <div className='inline-flex flex-col flex-1'>
          <div className='border-b-2 border-slate-300 flex justify-between items-center' onClick={(e) => {setShowPositions(!showPositions)}}>
            <h1 className='text-3xl my-8'>Amati</h1>
            <IoIosArrowDown className='text-2xl' />
          </div>
          <div className={showPositions ? 'block' : 'hidden'}>
            {
              (userData.isAdmin) ? (
                <div className='my-2'>
                  <input value={newPosition} onChange={(e) => setNewPosition(e.target.value)} className='border border-slate-300 p-2' />
                  <button onClick={handleSavePosition} className='p-2 bg-sky-600 inline-block rounded-sm text-white'>Pievienot</button>
                </div>

              )
                : ('')
            }

            {
              positions.map((position) => (
                <div key={position._id} className='border relative rounded-md shadow-md mb-4 p-4 bg-red-50'>
                  {position.name}
                  {
                    (userData.isAdmin) ? (
                      <div className='absolute right-4 top-1/2 -translate-y-1/2 flex gap-2 align-middle'>
                          <Link to={`/position/edit/${position._id}`}><AiOutlineEdit className='cursor-pointer'/></Link>
                          <MdOutlineDelete className='cursor-pointer' onClick={(e) => { handleDeletePosition(position._id) }} />
                        </div>
                      
                    )
                      : ('')
                  }
                </div>
              ))
            }
          </div>
        </div>


      </div>
    </div>
  )
}

export default EmployeeList