"use client";

import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import koLocale from "@fullcalendar/core/locales/ko";
import RightSidebar from "./Sidebar";
import LeftSidebar from "./LeftSideBar";
import useGetDataQuery from "@/app/hooks/account/useGetDataQuery";

const Calendar = () => {
  const { fetchMonthlyDataMutation, isInitialDataSuccess } = useGetDataQuery();
  const [events, setEvents] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [sidebarContent, setSidebarContent] = useState("default");
  const calendarRef = useRef<FullCalendar | null>(null); // FullCalendar 참조용

  const toggleSidebar = (content: string) => {
    setIsSidebarOpen(!isSidebarOpen);
    setSidebarContent(content);
  };
  // 왼쪽 사이드바 토글
  const toggleLeftSidebar = () => {
    setIsLeftSidebarOpen(!isLeftSidebarOpen);
  };

  // 사이드바가 열리거나 닫힐 때 FullCalendar 크기 업데이트
  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      setTimeout(() => {
        calendarApi.updateSize(); // 사이드바 열리고 닫힌 후 크기 업데이트
      }, 300); // 애니메이션과 함께 업데이트
    }
  }, [isSidebarOpen, isLeftSidebarOpen]); // 사이드바 상태가 변경될 때마다 호출

  // FullCalendar에서 월이 변경될 때 실행되는 함수
  const handleDatesSet = (info: any) => {
    const year = info.start.getFullYear();
    const month = info.start.getMonth() + 1;

    // 월별 데이터 POST 요청
    fetchMonthlyDataMutation.mutate(
      { year, month },
      {
        onSuccess: (data) => {
          setEvents(data); // 가져온 데이터를 FullCalendar에 반영
        },
      },
    );
  };

  // 초기 데이터 GET 성공 시, 현재 월의 데이터 가져오기
  useEffect(() => {
    if (isInitialDataSuccess) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;

      // 현재 월 POST 요청
      fetchMonthlyDataMutation.mutate(
        { year, month },
        {
          onSuccess: (data) => {
            setEvents(data); // 가져온 데이터를 FullCalendar에 반영
          },
        },
      );
    }
  }, [isInitialDataSuccess]);

  return (
    <div className="flex h-screen w-full">
      <LeftSidebar
        isOpen={isLeftSidebarOpen}
        toggleSidebar={toggleLeftSidebar}
      />
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen || isLeftSidebarOpen ? "w-[calc(100%-256px)]" : "w-full"
        }`}
        style={{
          marginLeft: isLeftSidebarOpen ? "256px" : "0",
          marginRight: isSidebarOpen ? "256px" : "0",
        }} // 왼쪽, 오른쪽 사이드바에 따라 마진 설정
      >
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          locale={koLocale}
          headerToolbar={{
            left: "today title prev,next",
            center: "",
            right: "",
          }}
          events={events}
          datesSet={handleDatesSet}
          dayCellContent={(dayCellArg) => (
            <span>{dayCellArg.date.getDate()}</span> // 날짜 숫자만 표시
          )}
        />
      </div>
      {/* 사이드바 컴포넌트 사용 */}
      <RightSidebar
        isOpen={isSidebarOpen}
        content={sidebarContent}
        toggleSidebar={toggleSidebar}
      />
    </div>
  );
};

export default Calendar;
