"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import koLocale from "@fullcalendar/core/locales/ko";
import RightSidebar from "./Sidebar";
import LeftSidebar from "./LeftSideBar";
import useGetDataQuery from "@/app/hooks/account/useGetDataQuery";
import ReservationCard from "./ReservationCard";

// 색상 배열
const COLORS = [
  "#FF0707",
  "#157938",
  "#00CF03",
  "#00E1FF",
  "#006FFF",
  "#BB00FF",
  "F8D701",
  "FF8107",
  "FF9CCC",
  "E0B5FF",
  "FFC756",
];

// 플랫폼별 로고
const PLATFORM_LOGOS: Record<string, string> = {
  hourplace: "/assets/OurPlace-Logo.png",
  spacecloud: "/assets/SpaceCloud-Logo.png",
};

// 디바운스 함수 추가 (요청이 너무 자주 발생하지 않도록)
const debounce = (func: (...args: any[]) => any, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const Calendar = () => {
  const { fetchMonthlyDataMutation, isInitialDataSuccess } = useGetDataQuery();
  const [events, setEvents] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [sidebarContent, setSidebarContent] = useState("default");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [locationColors, setLocationColors] = useState<Record<string, string>>(
    {},
  );
  const calendarRef = useRef<FullCalendar | null>(null);

  // 사이드바 상태 관리
  const toggleSidebar = useCallback((content: string) => {
    setIsSidebarOpen((prev) => !prev);
    setSidebarContent(content);
  }, []);

  const toggleLeftSidebar = useCallback(() => {
    setIsLeftSidebarOpen((prev) => !prev);
  }, []);

  // FullCalendar가 변경될 때 크기 업데이트
  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      setTimeout(() => calendarApi.updateSize(), 300);
    }
  }, [isSidebarOpen, isLeftSidebarOpen]);

  // 디바운스를 적용하여 너무 자주 데이터 요청하지 않게 설정
  const debouncedFetchEvents = useCallback(
    debounce((year: number, month: number) => {
      fetchMonthlyDataMutation.mutate(
        { year, month },
        {
          onSuccess: (data) => {
            const updatedEvents = data.contents.map((event: any) => {
              const locationColor = getLocationColor(event.location);
              const platformLogo = PLATFORM_LOGOS[event.platform] || "";

              // 시작 시간과 끝나는 시간에서 `T` 제거
              const startTime = new Date(event.startTime).toLocaleString();
              const endTime = new Date(event.endTime).toLocaleString();

              return {
                title: event.location, // 로케이션만 표시
                start: startTime,
                end: endTime,
                backgroundColor: locationColor,
                textColor: "#ffffff",
                extendedProps: { ...event },
                platformLogo,
              };
            });
            setEvents(updatedEvents);
          },
        },
      );
    }, 300),
    [fetchMonthlyDataMutation],
  );

  // 월이 변경될 때 실행되는 함수
  const handleDatesSet = useCallback(
    (info: any) => {
      const year = info.start.getFullYear();
      const month = info.start.getMonth() + 1;
      debouncedFetchEvents(year, month); // 디바운스된 요청 실행
    },
    [debouncedFetchEvents],
  );

  // 각 location에 대해 색상을 할당
  const getLocationColor = useCallback(
    (location: string) => {
      if (!locationColors[location]) {
        const randomColor =
          COLORS[Object.keys(locationColors).length % COLORS.length];
        setLocationColors((prevColors) => ({
          ...prevColors,
          [location]: randomColor,
        }));
      }
      return locationColors[location];
    },
    [locationColors],
  );

  // 이벤트 클릭 처리
  const handleEventClick = useCallback((clickInfo: any) => {
    setSelectedEvent(clickInfo.event.extendedProps);
  }, []);

  // 모달 닫기 핸들러
  const handleCloseModal = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  // 초기 데이터 로딩 성공 시, 현재 월의 데이터 가져오기
  useEffect(() => {
    if (isInitialDataSuccess) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      debouncedFetchEvents(year, month);
    }
  }, [isInitialDataSuccess, debouncedFetchEvents]);

  return (
    <div className="flex h-screen w-full">
      <LeftSidebar
        isOpen={isLeftSidebarOpen}
        toggleSidebar={toggleLeftSidebar}
        events={events}
      />
      <div
        className={`transition-all duration-300 ${isSidebarOpen || isLeftSidebarOpen ? "w-[calc(100%-256px)]" : "w-full"}`}
        style={{
          marginLeft: isLeftSidebarOpen ? "256px" : "0",
          marginRight: isSidebarOpen ? "256px" : "0",
        }}
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
          eventContent={(eventInfo) => (
            <div className="flex items-center justify-start h-full px-2">
              {/* 로케이션 이름 */}
              <span>{eventInfo.event.title}</span>
            </div>
          )}
          eventDidMount={(info) => {
            info.el.style.backgroundColor = info.event.backgroundColor;
            info.el.style.color = info.event.textColor;
            info.el.style.padding = "5px";
          }}
          eventClick={handleEventClick}
          datesSet={handleDatesSet}
          dayCellContent={(dayCellArg) => (
            <span>{dayCellArg.date.getDate()}</span>
          )}
        />
      </div>

      <RightSidebar
        isOpen={isSidebarOpen}
        content={sidebarContent}
        toggleSidebar={toggleSidebar}
      />

      {selectedEvent && selectedEvent.reservationNumber && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl">
            <ReservationCard
              reservationNumber={selectedEvent.reservationNumber}
              platform={selectedEvent.platform}
              customer={selectedEvent.customer}
              price={selectedEvent.price}
              link={selectedEvent.link}
              startTime={selectedEvent.startTime}
              endTime={selectedEvent.endTime}
              location={selectedEvent.location}
              process={selectedEvent.process}
              onClose={handleCloseModal}
              locationColor={getLocationColor(selectedEvent.location)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
