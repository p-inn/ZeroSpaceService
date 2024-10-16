"use client";

import React from "react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-white py-3 px-3 border shadow-lg z-50">
      <div className="mx-auto px-5 md:px-0">
        <div className="flex items-center justify-start h-12">
          <Image
            src="/assets/ZERO SPACE.png"
            alt="제로스페이스로고"
            className="mx-4"
            width={200}
            height={100}
          />
          <div className="badge badge-neutral px-2 mx-3">beta</div>
          <span className="px-2 mx-3">캘린더</span>
        </div>
      </div>
    </header>
  );
}
