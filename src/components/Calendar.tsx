"use client";
import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import koLocale from "@fullcalendar/core/locales/ko";
import RightSidebar from "./Sidebar";
import LeftSidebar from "./LeftSideBar";
import useGetDataQuery from "@/app/hooks/account/useGetDataQuery";
import ReservationCard from "./ReservationCard";
import { useRecoilValue } from "recoil";
import { userState } from "@/recoil/atoms";
import Spinner from "./Spinner";

// 색상 배열
const COLORS = [
  "#FFB4B4",
  "#FFC198",
  "#D3FF80",
  "#B9FFEB",
  "#006FFF",
  "#BB00FF",
  "ADE8FF",
  "E6D3FF",
];

// EventType 인터페이스 정의
interface EventType {
  title: string;
  start: Date;
  end: Date;
  backgroundColor: string;
  textColor: string;
  extendedProps: any;
  platformLogo: string;
}

// 플랫폼별 로고
const PLATFORM_LOGOS: Record<string, string> = {
  hourplace: "/assets/OurPlace-Logo.png",
  spacecloud: "/assets/SpaceCloud-Logo.png",
};

const Calendar = () => {
  const { fetchMonthlyDataMutation, isInitialDataSuccess, refetchInitialData } =
    useGetDataQuery();
  const [events, setEvents] = useState<EventType[]>([]); // EventType[]으로 상태 타입 지정
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [sidebarContent, setSidebarContent] = useState("default");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const calendarRef = useRef<FullCalendar | null>(null);
  const user = useRecoilValue(userState);
  const [isSyncing, setIsSyncing] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSidebarContent = (content: string) => {
    if (!isSidebarOpen) {
      setIsSidebarOpen(true);
    }
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
        calendarApi.refetchEvents();
      }, 300);
    }
  }, [isSidebarOpen, isLeftSidebarOpen, events]);

  const handleSyncUpdate = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    refetchInitialData()
      .then((initialData) => {
        console.log("초기 데이터 가져오기 성공: ", initialData);
        Promise.all([
          new Promise((resolve, reject) => {
            fetchMonthlyDataMutation.mutate(
              { year, month },
              {
                onSuccess: (postData) => {
                  console.log("월별 데이터 업데이트 완료: ", postData);
                  const updatedEvents = postData.contents.map((event: any) => {
                    const locationColor = getRandomColor();
                    const platformLogo = PLATFORM_LOGOS[event.platform] || "";
                    const startTime = new Date(event.startTime);
                    const endTime = new Date(event.endTime);
                    return {
                      title: event.location,
                      start: startTime,
                      end: endTime,
                      backgroundColor: locationColor,
                      textColor: "#000000",
                      extendedProps: { ...event },
                      platformLogo,
                    };
                  });
                  setEvents((prevEvents) => [...prevEvents, ...updatedEvents]); // 기존 이벤트와 병합
                  resolve(postData);
                },
                onError: (error) => {
                  console.error("월별 데이터 업데이트 실패: ", error);
                  reject(error);
                },
              },
            );
          }),
          new Promise((resolve) => {
            setIsSyncing(false);
            resolve(true);
          }),
        ])
          .then(() => {
            console.log("POST 요청 및 스피너 멈추기 완료");
          })
          .catch((error) => {
            console.error(
              "POST 요청 중 오류 발생 또는 스피너 멈추기 실패:",
              error,
            );
          });
      })
      .catch((error) => {
        console.error("초기 데이터 가져오기 실패: ", error);
        setIsSyncing(false);
      });
  };

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * COLORS.length);
    return COLORS[randomIndex];
  };

  const handleDatesSet = (info: any) => {
    if (!user.isAuthenticated) return;

    const startMonth = info.start.getMonth() + 1;
    const endMonth = info.end.getMonth() + 1;
    const startYear = info.start.getFullYear();
    const endYear = info.end.getFullYear();

    const monthsToRequest: { year: number; month: number }[] = [];

    if (startYear === endYear) {
      for (let month = startMonth; month <= endMonth; month++) {
        monthsToRequest.push({ year: startYear, month });
      }
    } else {
      for (let month = startMonth; month <= 12; month++) {
        monthsToRequest.push({ year: startYear, month });
      }
      for (let month = 1; month <= endMonth; month++) {
        monthsToRequest.push({ year: endYear, month });
      }
    }

    Promise.all(
      monthsToRequest.map(
        ({ year, month }) =>
          new Promise<EventType[]>((resolve, reject) => {
            fetchMonthlyDataMutation.mutate(
              { year, month },
              {
                onSuccess: (data) => {
                  const updatedEvents = data.contents.map((event: any) => {
                    const locationColor = getRandomColor();
                    const platformLogo = PLATFORM_LOGOS[event.platform] || "";

                    const startTime = new Date(event.startTime);
                    const endTime = new Date(event.endTime);

                    return {
                      title: event.location,
                      start: startTime,
                      end: endTime,
                      backgroundColor: locationColor,
                      textColor: "#000000",
                      extendedProps: { ...event },
                      platformLogo,
                    };
                  });
                  resolve(updatedEvents);
                },
                onError: (error) => {
                  console.error(
                    `월별 데이터 업데이트 실패: ${year}-${month}`,
                    error,
                  );
                  reject(error);
                },
              },
            );
          }),
      ),
    )
      .then((allEvents) => {
        const mergedEvents: EventType[] = allEvents.flat();
        setEvents(mergedEvents);
      })
      .catch((error) => {
        console.error("데이터 요청 중 오류 발생:", error);
      });
  };

  const handleEventClick = (clickInfo: any) => {
    setSelectedEvent(clickInfo.event.extendedProps);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  useEffect(() => {
    if (user.isAuthenticated && isInitialDataSuccess) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;

      if (events.length === 0) {
        fetchMonthlyDataMutation.mutate(
          { year, month },
          {
            onSuccess: (data) => {
              const updatedEvents = data.contents.map((event: any) => {
                const locationColor = getRandomColor();
                const platformLogo = PLATFORM_LOGOS[event.platform] || "";
                const startTime = new Date(event.startTime);
                const endTime = new Date(event.endTime);
                return {
                  title: event.location,
                  start: startTime,
                  end: endTime,
                  backgroundColor: locationColor,
                  textColor: "#000000",
                  extendedProps: { ...event },
                  platformLogo,
                };
              });
              setEvents(updatedEvents);
            },
          },
        );
      }
    }
  }, [user.isAuthenticated, isInitialDataSuccess]);

  return (
    <div className="flex h-screen w-full">
      {isSyncing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray-700">
          <Spinner />
        </div>
      )}
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
              {eventInfo.event.extendedProps.platformLogo && (
                <img
                  src={eventInfo.event.extendedProps.platformLogo}
                  alt="Platform Logo"
                  className="w-4 h-4 mr-2"
                />
              )}
              <span>{eventInfo.event.title}</span>
            </div>
          )}
          eventDidMount={(info) => {
            const backgroundColor = info.event.backgroundColor;
            const textColor = info.event.textColor;
            info.el.style.backgroundColor = backgroundColor;
            info.el.style.color = `${textColor} !important`;
            info.el.style.padding = "5px";
            info.el.style.whiteSpace = "nowrap";
            info.el.style.overflow = "hidden";
            info.el.style.textOverflow = "ellipsis";
            if (info.event.allDay) {
              info.el.style.backgroundColor = backgroundColor;
              info.el.style.color = textColor;
            }
          }}
          eventClick={handleEventClick}
          timeZone="local"
          datesSet={handleDatesSet}
          dayCellContent={(dayCellArg) => (
            <span>{dayCellArg.date.getDate()}</span>
          )}
        />
      </div>
      <RightSidebar
        isOpen={isSidebarOpen}
        isSyncing={isSyncing}
        content={sidebarContent}
        toggleSidebar={toggleSidebar}
        onSyncUpdate={handleSyncUpdate}
        toggleSidebarContent={toggleSidebarContent}
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
              locationColor={getRandomColor()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
