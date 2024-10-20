import React from "react";

const Spinner = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
    <span className="loading loading-spinner loading-lg text-white"></span>
    <p className="text-white m-2">연동 진행 중...</p>
  </div>
);

export default Spinner;
