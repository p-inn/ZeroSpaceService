"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosAccess } from "../../api/axiosInstance";
import useToast from "../useToast";

// 월별 데이터를 POST 요청으로 가져오는 API
const fetchMonthlyAPI = async ({
  year,
  month,
}: {
  year: number;
  month: number;
}) => {
  const res = await axiosAccess.post("/month", { year, month });
  return res.data;
};

// 초기 데이터를 GET 요청으로 가져오는 API
const fetchInitialAPI = async () => {
  const res = await axiosAccess.get("/data");
  return res.data;
};

const useGetDataQuery = () => {
  const { toastSuccess, toastError } = useToast();

  // 월별 데이터를 POST로 가져오는 Mutation
  const fetchMonthlyDataMutation = useMutation({
    mutationFn: fetchMonthlyAPI, // mutationFn은 mutation의 함수로 전달
    onSuccess: (data) => {
      toastSuccess("월별 데이터 가져오기 성공💫");
      console.log("월별 데이터: ", data);
    },
    onError: (error) => {
      toastError("월별 데이터 가져오기 실패💦");
      console.error(error);
    },
  });

  // 초기 데이터를 GET으로 가져오기
  const {
    data: initialData,
    isLoading: isInitialDataLoading,
    isSuccess: isInitialDataSuccess,
    refetch: refetchInitialData,
  } = useQuery({
    queryKey: ["initialData"],
    queryFn: fetchInitialAPI,
    enabled: false,
  });

  return {
    initialData,
    isInitialDataLoading,
    fetchMonthlyDataMutation,
    isInitialDataSuccess,
    refetchInitialData,
  };
};

export default useGetDataQuery;
