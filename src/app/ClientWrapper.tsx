'use client';

import { RecoilRoot } from "recoil";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
