"use client";

import React from "react";
import { useRecoilValue } from "recoil";
import { userState } from "@/recoil/atoms";
import useSignOutQuery from "@/app/hooks/auth/useLogoutQuery";

const LoggedInView: React.FC = () => {
  const user = useRecoilValue(userState);
  const { signOutMutate } = useSignOutQuery();

  const handleLogout = () => {
    signOutMutate();
  };
  return (
    <div>
      <h3 className="my-2 font-semibold">로그인 정보</h3>
      <p className="text-gray-500 text-xs mb-2">
        제로베이스 통합 로그인에 사용되는 카카오 로그인 정보입니다.
      </p>
      <div className="w-full bg-gray-300 p-2 rounded-lg">
        <span className="text-gray-700">{user.email}</span>
      </div>
      <div className="flex gap-1">
        <button className="btn bg-white text-gray-500 px-4 py-2 rounded-3xl hover:text-blue hover:border-blue-500 hover:bg-blue-300">
          회원탈퇴
        </button>
        <button
          className="btn bg-white text-gray-500 px-4 py-2 rounded-3xl hover:text-blue hover:border-blue-500 hover:bg-blue-300"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default LoggedInView;
