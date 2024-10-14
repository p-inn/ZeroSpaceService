import React from 'react';
import { BsChevronDoubleRight } from "react-icons/bs";

interface LeftSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white shadow-lg z-40 transition-transform duration-300 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-[calc(100%-4rem)]'
      } w-80 flex flex-col`}  style={{top: '4.5rem'}} // 사이드바와 달력을 함께 움직이도록 설정
    >
      {/* 사이드바 아이콘 부분 */}
      <div className="flex justify-end p-2">
        <img
          src="/assets/ICON.png"
          onClick={toggleSidebar}
          className="w-7 h-7 cursor-pointer mr-4"
          alt="아이콘"
        />
      </div>
      

      {/* 사이드바 내용 부분 */}
      <div className="w-[calc(100%-4rem)] h-full bg-white p-6 flex flex-col">
        <h2 className="text-lg font-bold mb-4">Calendar📅</h2>

        {/* 달력 부분 추가 예정*/}


        {/* 예약 리스트 부분 */}
        <div className="flex-grow">
          <h3 className="text-md font-bold mb-4 text-gray-500">나의 플레이스 리스트🌲</h3>
          <ul className="space-y-2 m-2">
            <li className="p-1">나의 플레이스</li>
            <li className="p-1">나의 플레이스</li>
            <li className="p-1">나의 플레이스</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
