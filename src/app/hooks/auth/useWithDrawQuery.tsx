"use client";

import { axiosAccess } from "../../api/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useToast from "../useToast";

const fetchAPI = async () => {
  const res = await axiosAccess.get("/memberleave");
  return res.data;
};

const useWithDrawQuery = () => {
  const { toastSuccess, toastError } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: withDrawMutate } = useMutation({
    mutationKey: ["memberleave"],
    mutationFn: () => fetchAPI(),
    onSuccess: () => {
      localStorage.removeItem("Access-Token");
      localStorage.removeItem("email");
      localStorage.removeItem("spacecloudEmail");
      localStorage.removeItem("spacecloudPassword");
      localStorage.removeItem("hourplaceEmail");
      localStorage.removeItem("hourplacePassword");
      queryClient.removeQueries({
        queryKey: ["memberleave"],
        exact: true,
      });
      toastSuccess("회원탈퇴에 성공하였습니다!");
      router.replace("/main");
    },
    onError: (error) => {
      toastError("회원탈퇴에 실패했습니다.");
      console.error(error);
    },
  });

  return { withDrawMutate };
};

export default useWithDrawQuery;
