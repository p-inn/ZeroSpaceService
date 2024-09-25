"use client";
import { useState } from "react";

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`transition-all ${isSidebarOpen ? "w-64" : "w-16"} h-full bg-gray-100`}
    >
      <button onClick={toggleSidebar} className="p-2 bg-gray-800 text-white">
        {isSidebarOpen ? "닫기" : "열기"}
      </button>
      {isSidebarOpen && (
        <div>
          <div className="p-4">
            <h3>장소 리스트</h3>
            {/* 장소 리스트 렌더링 */}
          </div>
          <div className="p-4">
            <h3>플랫폼 리스트</h3>
            {/* 플랫폼 리스트 렌더링 */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
