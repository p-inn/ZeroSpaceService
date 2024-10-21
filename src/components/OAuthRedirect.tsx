"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { userState } from "@/recoil/atoms";
import { defaultAxios } from "@/app/api/axiosInstance";
import useToast from "@/app/hooks/useToast";

export function OAuthRedirect() {
  const setUserState = useSetRecoilState(userState);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const { toastSuccess } = useToast();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await defaultAxios.post("/loginResult", { userId });
        const authorizationHeader = res.headers["authorization"];
        const accessToken = authorizationHeader?.replace("Bearer ", "") || "";

        // 로컬 스토리지에 토큰 및 사용자 정보 저장
        localStorage.setItem("Access-Token", accessToken);
        localStorage.setItem("email", String(res.data.email));
        localStorage.setItem(
          "spacecloudEmail",
          String(res.data.spacecloudEmail),
        );
        localStorage.setItem(
          "spacecloudPassword",
          String(res.data.spacecloudPassword),
        );
        localStorage.setItem("hourplaceEmail", String(res.data.hourplaceEmail));
        localStorage.setItem(
          "hourplacePassword",
          String(res.data.hourplacePassword),
        );

        // Recoil 상태 업데이트
        setUserState({
          isAuthenticated: true,
          accessToken,
          email: res.data.email,
          spacecloudEmail: res.data.spacecloudEmail,
          spacecloudPassword: res.data.spacecloudPassword,
          hourplaceEmail: res.data.hourplaceEmail,
          hourplacePassword: res.data.hourplacePassword,
        });

        // 요청이 성공했을 때만 /main으로 이동
        router.push("/main/calendar");
        toastSuccess("로그인에 성공하였습니다!");
      } catch (error) {
        console.error("Login failed:", error);
        // 실패 시 추가 처리 로직 작성 가능
        // 예를 들어, 에러 페이지로 이동하거나 알림을 표시할 수 있습니다.
      }
    };

    getUserInfo();
  }, []);

  return <div>로그인 중입니다... 잠시만 기다려 주세요.</div>;
}
