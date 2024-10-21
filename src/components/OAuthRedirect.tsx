"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { userState } from "@/recoil/atoms";
import { defaultAxios } from "@/app/api/axiosInstance";
import useToast from "@/app/hooks/useToast";
import useGetDataQuery from "@/app/hooks/account/useGetDataQuery";
import { getRandomColor, PLATFORM_LOGOS, EventType } from "./Calendar";

interface OAuthRedirectProps {
  setEvents?: React.Dispatch<React.SetStateAction<EventType[]>>;
}

export function OAuthRedirect({ setEvents }: OAuthRedirectProps) {
  const setUserState = useSetRecoilState(userState);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const { toastSuccess } = useToast();
  const { fetchMonthlyDataMutation } = useGetDataQuery();

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

        // 현재 날짜 기준으로 연도와 월 계산
        const currentDate = new Date();
        const year = currentDate.getFullYear(); // 현재 연도
        const month = currentDate.getMonth() + 1; // 현재 월 (0부터 시작하므로 +1)

        // 월별 데이터를 가져오는 POST 요청
        fetchMonthlyDataMutation.mutate(
          { year, month },
          {
            onSuccess: (data) => {
              if (data.contents && data.contents.length > 0) {
                const updatedEvents = data.contents.map((event: any) => {
                  const locationColor = getRandomColor();
                  const platformLogo = PLATFORM_LOGOS[event.platform] || "";
                  const startTime = new Date(event.startTime);
                  const endTime = new Date(event.endTime);
                  return {
                    title: event.location,
                    start: startTime,
                    end: endTime,
                    backgroundColor: locationColor,
                    textColor: "#000000",
                    extendedProps: { ...event },
                    platformLogo,
                  };
                });
                if (setEvents) {
                  setEvents(updatedEvents); // 이벤트가 있을 경우만 업데이트
                }
              } else {
                console.log("이벤트가 없습니다.");
                if (setEvents) {
                  setEvents([]); // 이벤트가 없을 경우 빈 배열로 설정하여 달력을 빈 상태로 유지
                }
              }
              router.push("/main/calendar"); // 페이지 이동
              toastSuccess("로그인에 성공하였습니다!");
            },
            onError: (error) => {
              console.error("월별 데이터 요청 실패:", error);
            },
          },
        );
      } catch (error) {
        console.error("Login failed:", error);
      }
    };

    getUserInfo();
  }, [fetchMonthlyDataMutation, setEvents, setUserState, userId]);

  return <div>로그인 중입니다... 잠시만 기다려 주세요.</div>;
}
