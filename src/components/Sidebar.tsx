"use client";

import React, { useState } from "react";
import KakaoLoginButton from "./KakaoLogin";
import LoggedInView from "./SetSignIn";
import { useRecoilValue } from "recoil";
import { userState } from "@/recoil/atoms";
import usePostAccountQuery from "@/app/hooks/account/usePostAccountQuery";
import AccountSaveForm from "./AccountSaveForm";
import useGetDataQuery from "@/app/hooks/account/useGetDataQuery";

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
  const user = useRecoilValue(userState);

  const { refetchInitialData, fetchMonthlyDataMutation, isInitialDataLoading } = useGetDataQuery();
  const [isSyncing, setIsSyncing] = useState(false); // 연동 업데이트 중인지 상태 관리

  // 연동 업데이트 버튼 클릭 시, 데이터 GET & POST 요청 실행
  const handleSyncUpdate = () => {
  if (isSyncing) return; // 이미 연동 업데이트 중이라면 더 이상 요청하지 않음

  setIsSyncing(true); // 연동 시작
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  // 먼저 GET 요청 실행
  refetchInitialData()
    .then((initialData) => {
      console.log("초기 데이터 가져오기 성공: ", initialData);

      // GET 요청 성공 시 POST 요청 실행
      fetchMonthlyDataMutation.mutate(
        { year, month },
        {
          onSuccess: (postData) => {
            console.log("월별 데이터 업데이트 완료: ", postData);
          },
          onError: (error) => {
            console.error("월별 데이터 업데이트 실패: ", error);
          },
          onSettled: () => {
            setIsSyncing(false); // 연동 완료 후 상태 초기화
          },
        }
      );
    })
    .catch((error) => {
      console.error("초기 데이터 가져오기 실패: ", error);
      setIsSyncing(false); // 실패 시 상태 초기화
    });
};

  // 스페이스 클라우드 계정 상태
  const [spaceCloudEmail, setSpaceCloudEmail] = useState("");
  const [spaceCloudSuccess, setSpaceCloudSuccess] = useState(false);

  // 아워플레이스 계정 상태
  const [ourPlaceEmail, setOurPlaceEmail] = useState("");
  const [ourPlaceSuccess, setOurPlaceSuccess] = useState(false);

  // usePostAccountQuery 훅 사용
  const { postAccountMutate, isPending } = usePostAccountQuery();

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
        } else if (platform === "hourplace") {
          setOurPlaceSuccess(true);
        }
      },
    });
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-lg z-40 transition-transform duration-300 transform ${
        isOpen ? "translate-x-0" : "translate-x-[calc(100%-4rem)]"
      } w-96 flex`}
      style={{ top: "5rem" }} // 사이드바와 아이콘을 함께 움직이도록 설정 (사이드바 너비 조정: 80px)
    >
      {/* 사이드바 아이콘 부분 */}
      <div className="flex flex-col items-center bg-white h-full w-16 border-r">
        <img
          src="/assets/LoginIcon.png"
          onClick={() => toggleSidebar("kakaoLogin")}
          className="rounded-full cursor-pointer p-2 hover:bg-gray-200"
          alt="카카오로그인 아이콘"
        />
        <img
          src="/assets/LinkageIcon.png"
          onClick={() => toggleSidebar("hourplace")}
          className="rounded-full cursor-pointer p-2 hover:bg-gray-200"
          alt="연동 플랫폼 관리 아이콘"
        />
        <img
          src="/assets/SurveyIcon.png"
          onClick={() => toggleSidebar("default")}
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
            <h2 className="text-2xl font-bold mb-6">연동 플랫폼 관리</h2>

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
            />
            <button
              className="btn bg-black absolute bottom-32 text-white font-bold rounded-3xl"
              disabled={isInitialDataLoading || isSyncing} // 요청 중일 때 버튼 비활성화
              onClick={handleSyncUpdate}
              style={{ width: "72%" }}
            >
              ⚒️ 연동 업데이트 ⚒️
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
