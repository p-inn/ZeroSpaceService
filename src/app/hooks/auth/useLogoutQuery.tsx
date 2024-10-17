"use client";

import { axiosAccess } from "../../api/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useToast from "../useToast";

const fetchAPI = async () => {
  const res = await axiosAccess.get("/logoutzero");
  return res.data;
};

const useSignOutQuery = () => {
  const { toastSuccess, toastError } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: signOutMutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => fetchAPI(),
    onSuccess: () => {
      localStorage.removeItem("Access-Token");
      localStorage.removeItem("email");
      queryClient.removeQueries({
        queryKey: ["email"],
        exact: true,
      });
      toastSuccess("로그아웃이 성공하였습니다!");
      router.replace("/main");
    },
    onError: (error) => {
      toastError("로그아웃에 실패했습니다.");
      console.error(error);
    },
  });

  return { signOutMutate };
};

export default useSignOutQuery;
