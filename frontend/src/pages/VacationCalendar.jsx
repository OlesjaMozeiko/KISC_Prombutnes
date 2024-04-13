import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Spinner from '../components/Spinner';
import EmployeeMonth from '../components/EmployeeMonth';
import { BsArrowRight } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";
import CalendarDates from '../components/CalendarDates';
import { Link } from 'react-router-dom';
import { BiSolidCircle } from "react-icons/bi";
import { useAuth } from '../components/AuthProvider';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const VacationCalendar = () => {
  const [userData, setUserData] = useState([]);

  const { isAuthenticated, token } = useAuth();


  const [employees, setEmployees] = useState([]);
  const [vacations, setVacations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [daysInMonth, setDaysInMonth] = useState(new Date(year, month + 1, 0).getDate());

  let monthNames = ['Janvāris', 'Februāris', 'Marts', 'Aprīlis', 'Maijs', 'Jūnijs', 'Jūlijs', 'Augusts', 'Septembris', 'Oktobris', 'Novembris', 'Decembris'];

  function nextMonth() {
    let nextMonth = month + 1;
    let nextYear = year;
    if (nextMonth === 12) {
      nextMonth = 0;
      nextYear++;
    }
    let nextDaysInMonth = new Date(nextYear, nextMonth + 1, 0).getDate();
    setMonth(nextMonth);
    setYear(nextYear);
    setDaysInMonth(nextDaysInMonth);
  }

  function prevMonth() {
    let prevMonth = month - 1;
    let prevYear = year;
    if (prevMonth === -1) {
      prevMonth = 11;
      prevYear--;
    }
    let prevDaysInMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
    setMonth(prevMonth);
    setYear(prevYear);
    setDaysInMonth(prevDaysInMonth);
  }


  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8000/employee')
      .then((response) => {
        setEmployees(response.data.data);
        console.log(employees);
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get('http://localhost:8000/vacation')
      .then((response) => {
        setVacations(response.data.data);
        console.log(vacations);
      })
      .catch((error) => {
        console.log(error);
      })


    axios.post('http://localhost:8000/auth', { jwt: token })
      .then((response) => {
        if (response.status == 200) {
          setUserData(response.data);
        }
      });


    setLoading(false);
  }, []);


  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Prombūtņu kalendārs</h1>
      </div>
      <div className='my-4'>
        <div className='flex gap-2 items-center'>
          <BiSolidCircle className='text-yellow-400' />
          <p>Nesaskaņots</p>
        </div>
        <div className='flex gap-2 items-center'>
          <BiSolidCircle className='text-green-600' />
          <p>Saskaņots</p>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className='border-collapse border border-slate-400 w-full'>
          <thead>
            <tr>
              <th rowSpan={2} className='border border-slate-300 p-2 text-left align-bottom'>Darbinieki</th>
              <th colSpan={daysInMonth} className='relative border border-slate-300 p-2 text-center'>
                <BsArrowLeft onClick={prevMonth} className='cursor-pointer absolute top-1/2 left-2 transform translate-x-1/2 -translate-y-1/2' />
                {monthNames[month]}
                <BsArrowRight onClick={nextMonth} className='cursor-pointer absolute top-1/2 right-2 transform -translate-x-1/2 -translate-y-1/2' />

              </th>
            </tr>

            {<CalendarDates year={year} month={month} />}

          </thead>

          <tbody>
            {
              employees.map((employee, index) => (


                <EmployeeMonth key={employee._id} id={employee._id} year={year} month={month} />

              ))
            }
          </tbody>
        </table>
      )}
      <div className='my-4 '>
        {
          (isAuthenticated) ? (<Link className='p-2 bg-sky-600 inline-block rounded-sm text-white' to={'/vacation/create'}> Pievienot prombūtni</Link>)
            : ('')
        }

        {
          (userData.isAdmin) ? (
            <Link className='mx-4 p-2 bg-sky-600 inline-block rounded-sm text-white' to={'/vacationtype/show'}>
              Rediģēt
            </Link>

          )
            : ('')
        }

      </div>
    </div>


  )
}

export default VacationCalendar