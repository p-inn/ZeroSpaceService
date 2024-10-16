"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { userState } from "@/recoil/atoms";

export default function OAuthRedirect() {
  // Recoil 상태 업데이트 함수
  const setUserState = useSetRecoilState(userState);
  const router = useRouter();

  // URL의 쿼리 파라미터에서 'Authorization'과 'userId' 값을 가져옴
  const { Authorization, userId, email } = router.query;

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        // 이미 Authorization과 userId를 쿼리 파라미터로 받았다고 가정
        if (
          Authorization &&
          userId &&
          email &&
          typeof Authorization === "string" &&
          typeof userId === "string" &&
          typeof email === "string"
        ) {
          // 로컬 스토리지에 토큰 저장
          localStorage.setItem("Access-Token", Authorization);
          localStorage.setItem("userPK", userId);
          localStorage.setItem("userEmail", email);

          // Recoil 상태 업데이트
          setUserState({
            isAuthenticated: true,
            accessToken: Authorization,
            refreshToken: "", // refreshToken 정보가 없다면 빈 문자열로 설정
            userPK: userId,
            email: email,
          });

          // 홈으로 리다이렉트
          router.push("/main/calendar");
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    };

    // Authorization과 userId가 존재하고 타입이 string일 때만 getUserInfo 호출
    if (Authorization && userId && email) {
      getUserInfo();
    }
  }, [Authorization, userId, email, router, setUserState]);

  return <div>로그인 진행 중입니다... 잠시만 기다려 주세요.</div>;
}
