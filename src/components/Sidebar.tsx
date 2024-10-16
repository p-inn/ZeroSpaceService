"use client";

import React from "react";
import { BsChevronRight } from "react-icons/bs";
import KakaoLoginButton from "./KakaoLogin";
import Image from "next/image";

interface SidebarProps {
  isOpen: boolean;
  content: string;
  toggleSidebar: (content: string) => void;
}

const RightSidebar: React.FC<SidebarProps> = ({
  isOpen,
  content,
  toggleSidebar,
}) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-lg z-40 transition-transform duration-300 transform ${
        isOpen ? "translate-x-0" : "translate-x-[calc(100%-4rem)]"
      } w-96 flex`}
      style={{ top: "5rem" }} // 사이드바와 아이콘을 함께 움직이도록 설정 (사이드바 너비 조정: 80px)
    >
      {/* 사이드바 아이콘 부분 */}
      <div className="flex flex-col items-center bg-white h-full w-16 border-r">
        <Image
          src="/assets/KakaoIcon.png"
          onClick={() => toggleSidebar("kakaoLogin")}
          className="rounded-full cursor-pointer p-2 hover:bg-gray-200"
          alt="카카오로그인 아이콘"
          width={50}
          height={50}
        />
        <Image
          src="/assets/AccessIcon.png"
          onClick={() => toggleSidebar("ourplace")}
          className="rounded-full cursor-pointer p-2 hover:bg-gray-200"
          alt="카카오로그인 아이콘"
          width={50}
          height={50}
        />
        <Image
          src="/assets/GoogleFormIcon.png"
          onClick={() => toggleSidebar("default")}
          className="rounded-full cursor-pointer p-2 hover:bg-gray-200"
          alt="카카오로그인 아이콘"
          width={50}
          height={50}
        />
      </div>

      {/* 사이드바 내용 부분 */}
      <div className="w-[calc(100%-4rem)] h-full bg-white p-6">
        {/* 사이드바 내용 렌더링 */}
        {content === "kakaoLogin" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">계정 관리</h2>
            <KakaoLoginButton />
            <span className="text-gray-500 text-sm">
              회원가입 시 제로스페이스의 이용약관 / 개인정보처리 방침에 동의하게
              됩니다.
            </span>
          </div>
        )}

        {content === "ourplace" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">연동 플랫폼 관리</h2>
            <div className="mb-16">
              <div className="flex mr-3 items-center gap-2 mb-4">
                <Image
                  src="/assets/SpaceCloud-Logo.png"
                  alt="카카오로그인 아이콘"
                  className="w-10 h-10"
                  width={50}
                  height={50}
                />
                <h3 className="text-lg font-bold items-center">
                  스페이스 클라우드
                </h3>
              </div>
              <input
                type="text"
                className="w-full p-2 border rounded mb-2"
                placeholder="아이디"
              />
              <input
                type="password"
                className="w-full p-2 border rounded mb-2"
                placeholder="비밀번호"
              />
              <button className="btn bg-gray-300 text-gray-700 px-4 py-2 rounded-lg w-full">
                계정 저장
              </button>
              <span className="flex gap-2 text-gray-500 text-xs mt-4">
                플랫폼 방문하여 아이디/비밀번호 찾기 <BsChevronRight />
              </span>
            </div>
            <div className="mb-16">
              <div className="flex mr-3 items-center gap-2 mb-4">
                <Image
                  src="/assets/OurPlace-Logo.png"
                  alt="카카오로그인 아이콘"
                  className="w-10 h-10"
                />
                <h3 className="text-lg font-bold items-center">아워플레이스</h3>
              </div>
              <input
                type="text"
                className="w-full p-2 border rounded mb-2"
                placeholder="아이디"
              />
              <input
                type="password"
                className="w-full p-2 border rounded mb-2"
                placeholder="비밀번호"
              />
              <button className="btn bg-gray-300 text-gray-700 px-4 py-2 rounded-lg w-full">
                계정 저장
              </button>
              <span className="flex gap-2 text-gray-500 text-xs mt-4">
                플랫폼 방문하여 아이디/비밀번호 찾기 <BsChevronRight />
              </span>
            </div>
            <div className="btn bg-black text-white rounded-full w-full ">
              연동 업데이트
            </div>
          </div>
        )}

        {content === "default" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">설문 조사</h2>
            <a className="link">설문조사 링크</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
