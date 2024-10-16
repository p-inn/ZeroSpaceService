"use client";

import { OAuthRedirect } from "@/components/OAuthRedirect";
import { Suspense } from "react";

export default function OAuthRedirectPage() {
  return (
    <Suspense fallback={<div>로그인 중입니다... 잠시만 기다려 주세요.</div>}>
      <OAuthRedirect />
    </Suspense>
  );
}
