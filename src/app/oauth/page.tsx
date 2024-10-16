"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { userState } from "@/recoil/atoms";
import { defaultAxios } from "@/app/api/axiosInstance";

export default function OAuthRedirect() {
  // Recoil 상태 업데이트 함수
  const setUserState = useSetRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        if (typeof window !== "undefined") {
          // URL의 쿼리 파라미터에서 'code' 값을 가져옴
          const searchParams = new URL(window.location.href).searchParams;
          const code = searchParams.get("code");

          if (!code) {
            throw new Error("Authorization code not found");
          }

          // 카카오 OAuth2 인증 코드를 백엔드로 전송하여 토큰을 받음
          const res = await defaultAxios.get(`/oauth?code=${code}`);

          // 토큰 및 사용자 정보 추출
          const authorizationHeader = res.headers["authorization"];
          const authorizationBody = res.data.refreshToken;
          const accessToken = authorizationHeader;
          const refreshToken = authorizationBody;
          const email = res.data.email;

          // 토큰과 이메일을 로컬 스토리지에 저장
          localStorage.setItem("Access-Token", accessToken);
          localStorage.setItem("Refresh-Token", refreshToken);
          localStorage.setItem("userPK", String(res.data.userId));
          localStorage.setItem("userEmail", email);

          // Recoil 상태 업데이트
          setUserState({
            isAuthenticated: true,
            accessToken,
            refreshToken,
            userPK: res.data.userId,
            email,
          });

          // 홈으로 리다이렉트
          router.push("/main/calendar");
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    };

    if (typeof window !== "undefined") {
      getUserInfo();
    }
  }, [router, setUserState]);

  return <div>로그인 진행 중입니다... 잠시만 기다려 주세요.</div>;
}
