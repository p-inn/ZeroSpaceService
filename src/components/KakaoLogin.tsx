"use client";

import { BsChevronRight } from "react-icons/bs";

declare global {
  interface Window {
    Kakao: any;
  }
}

const KakaoLoginButton: React.FC = () => {
  const handleKakaoLogin = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_ZEROSPACE_BASE_URL}/oauth2/authorization/kakao`;
  };

  return (
    <>
      <button
        className="btn bg-yellow-200 w-full border-none"
        onClick={handleKakaoLogin}
      >
        <p>카카오톡으로 3초만에 로그인</p>
      </button>
      <span className="text-gray-500 text-sm mt-2">
        회원가입 시 제로스페이스의 이용약관 / 개인정보처리 방침에 동의하게
        됩니다.
        <a
          className="link link-hover"
          href="https://hickory-mandible-ea4.notion.site/127b5ea5a7df80bfa11bcefe37fa57f5"
        >
          약관보기 <BsChevronRight />
        </a>
      </span>
    </>
  );
};

export default KakaoLoginButton;
