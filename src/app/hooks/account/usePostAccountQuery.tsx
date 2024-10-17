"use client";

import { axiosAccess } from "../../api/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useToast from "../useToast";

interface PlatformAccount {
  platform: string;
  password: string;
  email: string;
}

const fetchAPI = async (data: PlatformAccount) => {
  const res = await axiosAccess.post("/platform", data);
  return res.data;
};

const usePostAccountQuery = () => {
  const { toastSuccess, toastError } = useToast();
  const router = useRouter();

  const { mutate: postAccountMutate, isPending } = useMutation({
    mutationKey: ["saveAccount"],
    mutationFn: fetchAPI,
    onSuccess: () => {
      toastSuccess("계정 저장에 성공하였습니다!");
      router.replace("/main/calendar");
    },
    onError: (error) => {
      toastError("계정 저장에 실패했습니다.");
      console.error(error);
    },
  });

  return { postAccountMutate, isPending };
};

export default usePostAccountQuery;
