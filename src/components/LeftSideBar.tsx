"use client";

import FullCalendar from "@fullcalendar/react";
import React, { useMemo } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import koLocale from "@fullcalendar/core/locales/ko";
import Image from "next/image";

interface LeftSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  events: any[];
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  isOpen,
  toggleSidebar,
  events,
}) => {
  const locationList = useMemo(() => {
    const locationsWithColors = events.map((event) => ({
      name: event.title, // 로케이션 이름
      color: event.backgroundColor, // 로케이션 컬러
    }));

    // 중복된 로케이션 제거
    const uniqueLocations = Array.from(
      new Map(locationsWithColors.map((item) => [item.name, item])).values(),
    );

    return uniqueLocations;
  }, [events]);
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white shadow-lg z-40 transition-transform duration-300 transform ${
        isOpen ? "translate-x-0" : "-translate-x-[calc(100%-3rem)]"
      } w-80 flex flex-col`}
      style={{ top: "4.5rem" }} // 사이드바와 달력을 함께 움직이도록 설정
    >
      {/* 사이드바 아이콘 부분 */}
      <div className="flex justify-end p-2">
        <Image
          src="/assets/ICON.png"
          onClick={toggleSidebar}
          className="w-5 h-5 cursor-pointer mr-2 mt-2"
          alt="아이콘"
          width={50}
          height={50}
        />
      </div>

      {/* 사이드바 내용 부분 */}
      <div className="w-[calc(100%-2rem)] h-full bg-white p-3 flex flex-col ml-2">
        {/* 달력 부분 추가 예정*/}
        <div className="">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            locale={koLocale}
            dayHeaders={false}
            headerToolbar={{
              left: "title prev,next",
              center: "",
              right: "",
            }}
            height={450}
            contentHeight={100}
            aspectRatio={1}
            events={events}
            dayCellContent={(dayCellArg) => (
              <span>{dayCellArg.date.getDate()}</span>
            )}
            eventContent={(eventInfo) => (
              <div
                className="h-full w-full"
                style={{
                  backgroundColor: eventInfo.event.backgroundColor,
                }}
              />
            )}
            viewClassNames="calendar-small-style"
          />
        </div>
        {/* 예약 리스트 부분 */}
        <div className="flex-grow">
          <h3 className="text-md font-bold mb-4 text-gray-500">
            📕 나의 플레이스 리스트 📕
          </h3>
          <ul className="space-y-2 m-2">
            {locationList.length > 0 ? (
              locationList.map((location, index) => (
                <li key={index} className="p-1 flex items-center">
                  {/* 로케이션 컬러 표시 (동그라미) */}
                  <span
                    className="w-4 h-4 rounded-full mr-2"
                    style={{
                      backgroundColor: location.color,
                    }}
                  />
                  {/* 로케이션 이름 */}
                  {location.name}
                </li>
              ))
            ) : (
              <li className="p-1">등록된 플레이스가 없습니다.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
