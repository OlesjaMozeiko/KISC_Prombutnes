import React, { useEffect, useState } from 'react'

const CalendarDates = (props) => {

  const year = props.year;
  const month = props.month;
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const cells = [];

  for(let day = 1; day <= daysInMonth; day++ ){
    const date = `${year}/${(month+1).toString().padStart(2,'0')}/${day.toString().padStart(2, '0')}`;
    cells.push(
        <td key={day} className='-rotate-180 p-2 border border-slate-300' style={{ writingMode: 'vertical-rl' }}>
          {date}
        </td>
    );  
  }

  return (
    <tr>
        {cells}
    </tr>
  )
}

export default CalendarDates