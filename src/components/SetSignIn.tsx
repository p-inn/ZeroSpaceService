"use client";

import React from "react";
import { useRecoilState } from "recoil";
import { userState } from "@/recoil/atoms";
import useSignOutQuery from "@/app/hooks/auth/useLogoutQuery";
import useWithDrawQuery from "@/app/hooks/auth/useWithDrawQuery";

const LoggedInView: React.FC = () => {
  const [user, setUserState] = useRecoilState(userState);
  const { signOutMutate } = useSignOutQuery();
  const { withDrawMutate } = useWithDrawQuery();

  const handleLogout = () => {
    signOutMutate();
    // Recoil 상태 초기화
    setUserState({
      isAuthenticated: false,
      accessToken: "",
      email: "",
    });
  };

  const handleWithDraw = () => {
    withDrawMutate();
    // Recoil 상태 초기화
    setUserState({
      isAuthenticated: false,
      accessToken: "",
      email: "",
    });
  };

  return (
    <div>
      <h3 className="my-2 font-semibold">로그인 정보</h3>
      <p className="text-gray-500 text-xs mb-2">
        제로베이스 통합 로그인에 사용되는 카카오 로그인 정보입니다.
      </p>
      <div className="w-full bg-gray-300 p-2 rounded-lg my-2">
        <span className="text-gray-700">{user.email}</span>
      </div>
      <div className="flex gap-3 justify-center mt-4">
        <button
          className="btn w-full bg-white text-gray-500 px-4 py-2 rounded-3xl hover:text-blue-500 hover:border-blue-500 hover:bg-blue-200"
          onClick={handleWithDraw}
        >
          회원탈퇴
        </button>
        <button
          className="btn w-full bg-white text-gray-500 px-4 py-2 rounded-3xl hover:text-blue-500 hover:border-blue-500 hover:bg-blue-200"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default LoggedInView;
