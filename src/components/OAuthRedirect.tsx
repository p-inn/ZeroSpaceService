"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { userState } from "@/recoil/atoms";
import { defaultAxios } from "@/app/api/axiosInstance";

export function OAuthRedirect() {
  const setUserState = useSetRecoilState(userState);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const getUserInfo = async () => {
    try {
      const res = await defaultAxios.post("/loginResult", { userId });
      const authorizationHeader = res.headers["authorization"];
      const accessToken = authorizationHeader;

      // 로컬 스토리지에 토큰 및 사용자 정보 저장
      localStorage.setItem("Access-Token", accessToken);
      localStorage.setItem("email", String(res.data.email));

      // Recoil 상태 업데이트
      setUserState({
        isAuthenticated: true,
        accessToken,
        email: res.data.email,
      });

      // 요청이 성공했을 때만 /main으로 이동
      router.push("/main");
    } catch (error) {
      console.error("Login failed:", error);
      // 실패 시 추가 처리 로직 작성 가능
      // 예를 들어, 에러 페이지로 이동하거나 알림을 표시할 수 있습니다.
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  return <div>로그인 중입니다... 잠시만 기다려 주세요.</div>;
}
