import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Calendar from '../components/Calendar';
import { BsArrowRight } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";
import { useAuth } from '../components/AuthProvider';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';

const Holidays = () => {
  const [holidays, setHolidays] = useState([]);
  const [holidayTypes, setHolidayTypes] = useState([]);
  const [events, setEvents] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  const [userData, setUserData] = useState([]);

  const { isAuthenticated, token } = useAuth();

  const monthNames = ['Janvāris', 'Februāris', 'Marts', 'Aprīlis', 'Maijs', 'Jūnijs', 'Jūlijs', 'Augusts', 'Septembris', 'Oktobris', 'Novembris', 'Decembris'];
  const dayNames = ['Pirmdiena', 'Otrdiena', 'Trešdiena', 'Ceturtdiena', 'Piektdiena', 'Sestdiena', 'Svētdiena'];

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

  }

  async function fetchData() {
    await axios.get('http://localhost:8000/holiday')
      .then((response) => {
        setHolidays(response.data.data);
        console.log(holidays);
      })
      .catch((error) => {
        console.log(error);
      })

    await axios.get(`http://localhost:8000/event/${year}/${month + 1}`)
      .then((response) => {
        setEvents(response.data);
        console.log(events);
      })
      .catch((error) => {
        console.log(error);
      })

    await axios.get('http://localhost:8000/holidaytype')
      .then((response) => {
        setHolidayTypes(response.data.data);
        console.log(holidayTypes);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {

    axios.post('http://localhost:8000/auth', { jwt: token })
      .then((response) => {
        if (response.status == 200) {
          setUserData(response.data);
        }
      });

    fetchData();

  }, [year, month]);

  function getDateRange(event) {
    return `${new Date(event.startDate).toLocaleDateString()} - ${new Date(event.endDate).toLocaleDateString()}`;
  }

  const handleDelete = (id) => {
    let ans = confirm('Are You Sure?');
    if (ans) {
      axios.delete(`http://localhost:8000/event/${id}`)
        .then(() => {
          setEvents(events.filter(event => event._id !== id));
        })
        .catch((error) => {
          alert('An error occured! Try again later!');
          console.log(error);
        })
    }
  }

  return (
    <div className='p-4 flex items-start justify-self-start'>
      <div className='inline-flex flex-col flex-1'>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl my-8'>Svētki</h1>
        </div>
        <div className='my-4'>
          {/* Calendar */}
          <div className='w-5/6 border rounded-md shadow-md'>
            <header className='flex items-center p-2 justify-between'>
              <BsArrowLeft onClick={prevMonth} className='m-2 text-2xl cursor-pointer' />
              <p className='font-medium text-2xl'>{`${monthNames[month]} ${year}`}</p>
              <BsArrowRight onClick={nextMonth} className='m-2 text-2xl cursor-pointer' />
            </header>

            <div className='p-4'>
              <ul className='list-none flex-wrap flex text-center'>
                <li className='w-[calc(100%/7)] text-md font-normal mb-4'>{dayNames[0]}</li>
                <li className='w-[calc(100%/7)] text-md font-normal mb-4'>{dayNames[1]}</li>
                <li className='w-[calc(100%/7)] text-md font-normal mb-4'>{dayNames[2]}</li>
                <li className='w-[calc(100%/7)] text-md font-normal mb-4'>{dayNames[3]}</li>
                <li className='w-[calc(100%/7)] text-md font-normal mb-4'>{dayNames[4]}</li>
                <li className='w-[calc(100%/7)] text-md font-normal mb-4'>{dayNames[5]}</li>
                <li className='w-[calc(100%/7)] text-md font-normal mb-4'>{dayNames[6]}</li>
              </ul>

              <ul className='mb-5 '>
                <Calendar year={year} month={month} holidays={holidays} holidayTypes={holidayTypes} />
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className='inline-flex flex-col flex-1'>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl my-8'>Pasākumi</h1>

          {
            (userData.isAdmin) ? (
              <Link to={'/event/create'}>
                <MdOutlineAddBox className='text-3xl text-sky-600' />
              </Link>

            )
              : ('')
          }

        </div>



        <div className='my-4'>
          {
            events.map((event) => (
              <div className='border relative rounded-md shadow-md mb-4 p-8 bg-sky-50' key={event._id}>
                <span className='font-normal'>{getDateRange(event)}</span> : <span>{event.description}</span>
                {
                  (userData.isAdmin) ? (
                    <div className='absolute right-4 top-1/2 -translate-y-1/2 flex gap-2 align-middle'>
                      <Link to={`/event/edit/${event._id}`}><AiOutlineEdit className='cursor-pointer'/></Link>
                      <MdOutlineDelete className='cursor-pointer' onClick={(e) => { handleDelete(event._id) }} />
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
  )
}

export default Holidays