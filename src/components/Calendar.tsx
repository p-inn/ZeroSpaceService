'use client';
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko';


const Calendar = () => {

  return (
    <div className=''>
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        locale={koLocale}
        headerToolbar={{
          left: 'today title prev,next',
          center: '',
          right: ''
        }}
        events={[
          { title: 'Event 1', date: '2024-06-01' },
          { title: 'Event 2', date: '2024-06-07' }
        ]}
        dayCellContent={(dayCellArg) => (
          <span>{dayCellArg.date.getDate()}</span>  // 날짜 숫자만 표시
        )}
      />
    </div>  
  );
};

export default Calendar;
