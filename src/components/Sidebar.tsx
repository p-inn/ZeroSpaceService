"use client";

import React, { useEffect, useRef, useState } from "react";
import KakaoLoginButton from "./KakaoLogin";
import LoggedInView from "./SetSignIn";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "@/recoil/atoms";
import usePostAccountQuery from "@/app/hooks/account/usePostAccountQuery";
import AccountSaveForm from "./AccountSaveForm";

interface SidebarProps {
  isOpen: boolean;
  content: string;
  toggleSidebar: (content: string) => void;
  toggleSidebarContent: (content: string) => void;
  onSyncUpdate: () => void;
  onGetUpdate: () => void;
  isSyncing: boolean;
}

const RightSidebar: React.FC<SidebarProps> = ({
  isOpen,
  content,
  toggleSidebar,
  onSyncUpdate,
  onGetUpdate,
  isSyncing,
  toggleSidebarContent,
}) => {
  const setUserState = useSetRecoilState(userState);
  const user = useRecoilValue(userState);
  const sidebarRef = useRef(null);

  // 스페이스 클라우드 계정 상태
  const [spaceCloudEmail, setSpaceCloudEmail] = useState("");
  const [spaceCloudSuccess, setSpaceCloudSuccess] = useState(false);

  // 아워플레이스 계정 상태
  const [ourPlaceEmail, setOurPlaceEmail] = useState("");
  const [ourPlaceSuccess, setOurPlaceSuccess] = useState(false);

  // usePostAccountQuery 훅 사용
  const { postAccountMutate, isPending } = usePostAccountQuery();

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("Access-Token");
    const storedEmail = localStorage.getItem("email");
    const storedSpacecloudEmail = localStorage.getItem("spacecloudEmail");
    const storedSpacecloudPassword = localStorage.getItem("spacecloudPassword");
    const storedHourplaceEmail = localStorage.getItem("hourplaceEmail");
    const storedHourplacePassword = localStorage.getItem("hourplacePassword");

    if (storedAccessToken && storedEmail) {
      // 로컬 스토리지에서 가져온 정보를 Recoil 상태에 저장
      setUserState({
        isAuthenticated: true,
        accessToken: storedAccessToken,
        email: storedEmail,
        spacecloudEmail: storedSpacecloudEmail || "",
        spacecloudPassword: storedSpacecloudPassword || "",
        hourplaceEmail: storedHourplaceEmail || "",
        hourplacePassword: storedHourplacePassword || "",
      });
    }
  }, [setUserState]);

  useEffect(() => {
    const storedSpaceCloudEmail = localStorage.getItem("spacecloudEmail");
    const storedHourPlaceEmail = localStorage.getItem("hourplaceEmail");

    if (storedSpaceCloudEmail) {
      setSpaceCloudEmail(storedSpaceCloudEmail);
      setSpaceCloudSuccess(true); // 연동된 상태로 설정
    }

    if (storedHourPlaceEmail) {
      setOurPlaceEmail(storedHourPlaceEmail);
      setOurPlaceSuccess(true); // 연동된 상태로 설정
    }
  }, []);

  // 계정 저장 핸들러
  const handleSaveAccount = (
    platform: string,
    email: string,
    password: string,
  ) => {
    const platformData = {
      platform,
      email,
      password,
    };
    postAccountMutate(platformData, {
      onSuccess: () => {
        if (platform === "spacecloud") {
          setSpaceCloudSuccess(true);
          localStorage.setItem("spacecloudEmail", email); // 저장 시 로컬 스토리지에 저장
        } else if (platform === "hourplace") {
          setOurPlaceSuccess(true);
          localStorage.setItem("hourplaceEmail", email); // 저장 시 로컬 스토리지에 저장
        }
      },
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !(sidebarRef.current as HTMLElement).contains(event.target as Node)
      ) {
        toggleSidebar("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 right-0 h-full bg-white shadow-lg z-40 transition-transform duration-300 transform ${
        isOpen ? "translate-x-0" : "translate-x-[calc(100%-4rem)]"
      } w-96 flex`}
      style={{ top: "5rem" }} // 사이드바와 아이콘을 함께 움직이도록 설정 (사이드바 너비 조정: 80px)
    >
      {/* 사이드바 아이콘 부분 */}
      <div className="flex flex-col items-center bg-white h-full w-16 border-r">
        <img
          src="/assets/LoginIcon.png"
          onClick={() => toggleSidebarContent("kakaoLogin")}
          className="rounded-full cursor-pointer p-2 hover:bg-gray-200"
          alt="카카오로그인 아이콘"
        />
        <img
          src="/assets/LinkageIcon.png"
          onClick={() => toggleSidebarContent("hourplace")}
          className="rounded-full cursor-pointer p-2 hover:bg-gray-200"
          alt="연동 플랫폼 관리 아이콘"
        />
        <img
          src="/assets/SurveyIcon.png"
          onClick={() => toggleSidebarContent("default")}
          className="rounded-full cursor-pointer p-2 hover:bg-gray-200"
          alt="설문조사 아이콘"
        />
      </div>

      {/* 사이드바 내용 부분 */}
      <div className="w-[calc(100%-4rem)] h-full bg-white p-6">
        {content === "kakaoLogin" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">계정 관리</h2>
            {user.isAuthenticated ? <LoggedInView /> : <KakaoLoginButton />}
          </div>
        )}

        {content === "hourplace" && (
          <div>
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold mb-6">연동 플랫폼 관리</h2>
              <button className="btn badge-lg text-white" onClick={onGetUpdate}>
                기존 정보 불러오기
              </button>
            </div>
            {/* 스페이스 클라우드 계정 관리 */}
            <AccountSaveForm
              platform="스페이스 클라우드"
              platformLogo="/assets/SpaceCloud-Logo.png"
              onSave={(email, password) =>
                handleSaveAccount("spacecloud", email, password)
              }
              isPending={isPending}
              success={spaceCloudSuccess}
              email={spaceCloudEmail}
              setEmail={setSpaceCloudEmail}
              setSuccess={setSpaceCloudSuccess}
              platformLink="https://partner.spacecloud.kr/auth/login"
            />

            {/* 아워플레이스 계정 관리 */}
            <AccountSaveForm
              platform="아워플레이스"
              platformLogo="/assets/OurPlace-Logo.png"
              onSave={(email, password) =>
                handleSaveAccount("hourplace", email, password)
              }
              isPending={isPending}
              success={ourPlaceSuccess}
              email={ourPlaceEmail}
              setEmail={setOurPlaceEmail}
              setSuccess={setOurPlaceSuccess}
              platformLink="https://hourplace.co.kr/email/find"
            />
            <button
              className="btn bg-black absolute bottom-32 text-white font-bold rounded-3xl"
              disabled={isSyncing} // 요청 중일 때 버튼 비활성화
              onClick={onSyncUpdate}
              style={{ width: "72%" }}
            >
              {isSyncing ? "업데이트 중..." : "⚒️ 연동 업데이트 ⚒️"}
            </button>
          </div>
        )}

        {content === "default" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">설문 조사</h2>
            <a className="link" href="https://forms.gle/CZCF6ob5E5Dk6iAk8">
              설문조사 링크
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
