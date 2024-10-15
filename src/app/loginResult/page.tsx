'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginResult() {
  const router = useRouter();

  useEffect(() => {
    // 로그인 성공 후, 원하는 경로로 이동
    router.push('/main/calendar');
  }, []);

  return <div>로그인 성공! 페이지로 이동 중입니다...</div>;
}
