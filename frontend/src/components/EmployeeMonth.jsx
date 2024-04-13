import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const EmployeeMonth = (props) => {
  //const [cells, setCells] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [vacations, setVacations] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/employee/${props.id}`)
        .then((response) => {
            setEmployee(response.data);
        })
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:8000/vacation/`)
        .then((response) => {
            setVacations(response.data.data);
        })
  }, []);

  const year = props.year;
  const month = props.month;
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const cells = [];

  for(let day = 1; day <= daysInMonth; day++ ){
    let date = new Date(year, month, day);
    let pushed = false;
    vacations.map((vacation, index) => {
        if( employee._id == vacation.employee ){
            const startDate = new Date(vacation.startDate);
            const endDate = new Date(vacation.endDate);
            //adjust
            startDate.setDate( startDate.getDate() - 1 )
            if( date >= startDate && date <= endDate ){
                let style = 'relative border-y border-slate-300  ' + (vacation.approved ? 'bg-green-600' : 'bg-yellow-400');
                cells.push(                  
                    <td key={day} className={style}>
                        <Link to={`/vacation/show/${vacation._id}`} className='p-2 block inset-0 absolute'> </Link>
                    </td>
                );
                pushed = true;
            }
        }
        
    });

    if(!pushed){
        const regularStyle = 'p-2 border border-slate-300';
        const weekendStyle = 'p-2 border border-slate-300 bg-blue-100';
        cells.push(
            <td key={day} className={(date.getDay() == 0 || date.getDay() == 6) ? weekendStyle : regularStyle}>
                
            </td>
        );
    }
  }

  return (
    <tr>
        <td  className='border border-slate-300 p-2'>{`${employee.name} ${employee.surname}`}</td>
        {cells}
    </tr>
  )
}

export default EmployeeMonth