'use client';
import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko';
import Sidebar from './Sidebar';


const Calendar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarContent, setSidebarContent] = useState('default');
    const calendarRef = useRef<FullCalendar|null>(null); // FullCalendar 참조용

  const toggleSidebar = (content: string) => {
    setIsSidebarOpen(!isSidebarOpen);
    setSidebarContent(content); 
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // 사이드바가 열리거나 닫힐 때 FullCalendar 크기 업데이트
  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      setTimeout(() => {
        calendarApi.updateSize(); // 사이드바 열리고 닫힌 후 크기 업데이트
      }, 300); // 애니메이션과 함께 업데이트
    }
  }, [isSidebarOpen]);  // 사이드바 상태가 변경될 때마다 호출


  return (
    <div className='flex h-screen w-full'>
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-[calc(100%-256px)]' : 'w-full'}`}>
      <FullCalendar
        ref={calendarRef}
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
      {/* 사이드바 컴포넌트 사용 */}
      <Sidebar isOpen={isSidebarOpen} content={sidebarContent} closeSidebar={closeSidebar} toggleSidebar={toggleSidebar}/>

  </div>
  );
};

export default Calendar;
