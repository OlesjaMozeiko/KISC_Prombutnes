import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Calendar = (props) => {

    const holidays = props.holidays;
    const types = props.holidayTypes;
    const year = props.year;
    const month = props.month;

    const dayOne = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const dayEnd = new Date(year, month, lastDate).getDay();
    const monthLastDate = new Date(year, month, 0).getDate();

    const inactiveStyle = 'w-[calc(100%/7)] text-center p-4 bg-gray-50 text-gray-400';
    const activeStyle = 'w-[calc(100%/7)] text-center p-4 border border-gray-100 ';
    const holidayStyle = 'w-[calc(100%/7)] text-center p-4  bg-red-100 relative group';
    const weekendStyle = 'w-[calc(100%/7)] text-center p-4  bg-blue-100 border border-gray-100';

    function getHolidayType(id){
        for (let i = 0; i < types.length; i++) {
            if (types[i]._id == id) {
              return types[i].name;
            }
          }
    }

    const days = [];
    const offset = dayOne == 0 ? 6 : -1;
    for (let i = dayOne + offset; i > 0; i--) {
        days.push(<li key={`preinactive${i}`} className={inactiveStyle}>{monthLastDate - i + 1}</li>);
    }

    for (let i = 1; i <= lastDate; i++) {
        let isHoliday = false;
        const currentDate = new Date(year, month, i);
        let holidayName = '';
        let type = '';
        for (let j = 0; j < holidays.length; j++) {
            const startDate = new Date(holidays[j].startDate);
            const endDate = new Date(holidays[j].endDate);
            holidayName = holidays[j].description;      
            type = getHolidayType(holidays[j].type);
            //adjust
            startDate.setDate( startDate.getDate() - 1 )

            if (currentDate >= startDate && currentDate <= endDate) {
                isHoliday = true;
                break;
            }
        }
        if (isHoliday) {
            days.push(
                <li key={`holiday-${i}`} className={holidayStyle}>
                    {i}
                    <div className='hidden group-hover:block absolute top-0 text-xl p-4 z-20 bg-white border border-slate-300 -translate-y-full translate-x-1/2'>
                        <p>{holidayName}</p>
                        <p>{type}</p>
                    </div>
                </li>);
        } else {

            if( currentDate.getDay() == 0 || currentDate.getDay() == 6 ){
                
                days.push(<li key={`active-${i}`} className={weekendStyle}>{i}</li>);
            }else{
                days.push(<li key={`active-${i}`} className={activeStyle}>{i}</li>);
            }
            console.log(`(${dayOne}) ${year}.${month}.${i}  ${currentDate} : ${currentDate.getDay()}`)
            
        }

    }

    for (let i = dayEnd; i < 7; i++) {
        days.push(<li key={`postinactive${i}`} className={inactiveStyle}>{i - dayEnd + 1}</li>);
    }




    return (
        <ul className='flex flex-wrap mb-5 '>
            {
                days
            }
        </ul>
    )
}

export default Calendar