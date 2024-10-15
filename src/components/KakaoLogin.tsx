'use client';
declare global {
  interface Window {
    Kakao: any
  }
}

const KakaoLoginButton: React.FC = () => {
  const handleKakaoLogin = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_ZEROSPACE_BASE_URL}/oauth2/authorization/kakao`;
  }

  return (
    <button className="btn bg-yellow-200 w-full"
      onClick={handleKakaoLogin}
    >
        <p>카카오톡으로 3초만에 로그인</p>
    </button>
  )
}

export default KakaoLoginButton;