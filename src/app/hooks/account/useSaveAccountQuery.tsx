import { axiosAccess } from "../../api/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../useToast";

interface SaveAccountParams {
  platform: string;
  email: string;
  password: string;
}

// API 응답 타입 정의
interface SaveAccountResponse {
  success: boolean;
  message: string;
}

const fetchAPI = async ({ platform, email, password }: SaveAccountParams) => {
  const response = await axiosAccess.post("/platform", {
    platform,
    email,
    password,
  });
  return response.data as SaveAccountResponse;
};

const useSaveAccountQuery = () => {
  const { toastSuccess, toastError } = useToast();
  return useMutation({
    mutationFn: fetchAPI,
    onSuccess: () => {
      toastSuccess("계정 저장에 성공하였습니다!");
    },
    onError: () => {
      toastError("계정 저장에 실패하였습니다.");
    },
  });
};

export default useSaveAccountQuery;
