"use client";

import React, { useState } from "react";
import { BsChevronRight } from "react-icons/bs";

interface AccountSaveFormProps {
  platform: string;
  platformLogo: string;
  onSave: (email: string, password: string) => void;
  isPending: boolean;
  success: boolean;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  platformLink: string;
}

const AccountSaveForm: React.FC<AccountSaveFormProps> = ({
  platform,
  platformLogo,
  onSave,
  isPending,
  success,
  email,
  setEmail,
  setSuccess,
  platformLink,
}) => {
  const [password, setPassword] = useState("");

  const handleSave = () => {
    onSave(email, password);
  };

  return (
    <div className="mb-16">
      <div className="flex mr-3 items-center gap-2 mb-4">
        <img
          src={platformLogo}
          alt={`${platform} 로고`}
          className="w-10 h-10"
        />
        <h3 className="text-lg font-bold items-center">{platform}</h3>
      </div>

      {success ? (
        <div className="w-full">
          <p className="text-gray-500 font-semibold">{email}</p>
          <button
            className="btn w-full bg-white border border-gray-300 p-4 rounded-lg text-gray-500"
            onClick={() => setSuccess(false)}
          >
            계정 변경
          </button>
        </div>
      ) : (
        <>
          <input
            type="text"
            className="w-full p-2 border rounded mb-2"
            placeholder="아이디"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-2 border rounded mb-2"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="btn bg-gray-300 text-gray-700 px-4 py-2 rounded-lg w-full"
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? "저장 중..." : "계정 저장"}
          </button>
          <a
            href={platformLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-2 text-gray-500 text-xs mt-4"
          >
            플랫폼 방문하여 아이디/비밀번호 찾기 <BsChevronRight />
          </a>
        </>
      )}
    </div>
  );
};

export default AccountSaveForm;
