"use client";

import React, { useEffect, useRef, useState } from "react";
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

  const toggleSidebar = (content: string) => {
    setIsSidebarOpen(!isSidebarOpen);
    setSidebarContent(content);
  };

  const toggleLeftSidebar = () => {
    setIsLeftSidebarOpen(!isLeftSidebarOpen);
  };

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      setTimeout(() => {
        calendarApi.updateSize();
      }, 300);
    }
  }, [isSidebarOpen, isLeftSidebarOpen]);

  const handleDatesSet = (info: any) => {
    const year = info.start.getFullYear();
    const month = info.start.getMonth() + 1;

    fetchMonthlyDataMutation.mutate(
      { year, month },
      {
        onSuccess: (data) => {
          const updatedEvents = data.contents.map((event: any) => {
            const locationColor = getLocationColor(event.location);
            const platformLogo = PLATFORM_LOGOS[event.platform] || "";

            // 시작 시간, 끝나는 시간을 `T` 제거하고 형식에 맞게 변환
            const startTime = new Date(event.startTime).toLocaleString();
            const endTime = new Date(event.endTime).toLocaleString();

            return {
              title: event.location, // 로케이션만 표시
              start: startTime,
              end: endTime,
              backgroundColor: locationColor,
              textColor: "#ffffff", // 글씨를 흰색으로 설정
              extendedProps: { ...event },
              platformLogo,
            };
          });
          setEvents(updatedEvents);
        },
      },
    );
  };

  // 각 location에 대해 색상을 할당
  const getLocationColor = (location: string) => {
    if (!locationColors[location]) {
      const randomColor =
        COLORS[Object.keys(locationColors).length % COLORS.length];
      setLocationColors((prevColors) => ({
        ...prevColors,
        [location]: randomColor,
      }));
    }
    return locationColors[location];
  };

  const handleEventClick = (clickInfo: any) => {
    setSelectedEvent(clickInfo.event.extendedProps);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  useEffect(() => {
    if (isInitialDataSuccess) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;

      fetchMonthlyDataMutation.mutate(
        { year, month },
        {
          onSuccess: (data) => {
            const updatedEvents = data.contents.map((event: any) => {
              const locationColor = getLocationColor(event.location);
              const platformLogo = PLATFORM_LOGOS[event.platform] || "";

              const startTime = new Date(event.startTime).toLocaleString();
              const endTime = new Date(event.endTime).toLocaleString();

              return {
                title: event.location, // 로케이션 이름만 표시
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
    }
  }, [isInitialDataSuccess]);

  return (
    <div className="flex h-screen w-full">
      <LeftSidebar
        isOpen={isLeftSidebarOpen}
        toggleSidebar={toggleLeftSidebar}
        events={events}
      />
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen || isLeftSidebarOpen ? "w-[calc(100%-256px)]" : "w-full"
        }`}
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
            // 이벤트 스타일링
            const backgroundColor = info.event.backgroundColor;
            const textColor = info.event.textColor;
            // 배경색 및 글자색 설정
            info.el.style.backgroundColor = backgroundColor;
            info.el.style.color = textColor;
            info.el.style.padding = "5px";
            if (info.event.allDay) {
              info.el.style.backgroundColor = backgroundColor;
              info.el.style.color = textColor;
            }
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
          {/* 모달 박스 */}
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
