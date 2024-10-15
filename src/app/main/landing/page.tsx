import React from "react";
import Image from "next/image";

const Landing = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center py-20">
        <div className="w-max flex items-center align-middle text-center">
          <div className="flex-row text-5xl tracking-wide font-bold leading-relaxed">
            <p>흩어져 있는 내 플레이스 예약정보를</p>
            <p>
              <span className="text-blue-700 pr-3">한눈에</span>확인해보세요!
            </p>
          </div>
        </div>
        <div className="my-4 text-center tracking-wide">
          <p className="text-lg text-gray-600 font-semibold">
            제로스페이스는 공간임대 사업자를 위한 새로운 예약 통합관리
            솔루션입니다.
          </p>
        </div>
        <div className="btn bg-black text-white rounded-full text-xl w-48 h-20">
          시작하기
        </div>
        <div className="flex m-8 justify-center align-middle">
          <div className="w-60 h-72 flex flex-col border m-4 rounded-lg shadow-[0px_10px_10px_-5px_rgba(0,0,0,0.2)] items-center justify-center">
            <Image
              src="/assets/SpaceCloud-Logo.png"
              alt="SpaceCloudLogo"
              className="w-24 h-24"
            />
            <span className="text-lg font-bold m-4">스페이스 클라우드</span>
            <span className="text-gray-600">연동 가능</span>
          </div>
          <div className="w-60 h-72 flex flex-col border m-4 rounded-lg shadow-[0px_10px_10px_-5px_rgba(0,0,0,0.2)] items-center justify-center">
            <Image
              src="/assets/OurPlace-Logo.png"
              alt="OurPlaceLogo"
              className="w-24 h-24"
            />
            <span className="text-lg font-bold m-4">아워플레이스</span>
            <span className="text-gray-600">연동 가능</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
