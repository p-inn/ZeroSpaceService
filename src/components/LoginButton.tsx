// 'use client';
// import React, { useState } from "react";
// import { useRecoilState } from "recoil";
// import { userState } from "../recoil/atoms";

// const LoginButton = () => {
//   const [user, setUser] = useRecoilState(userState);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);

//   // 로그인 버튼 클릭 시 실행할 함수
//   const handleLogin = async () => {
//     try {
//       // 로그인 API 호출 (예시 URL 사용)
//       const response = await fetch("https://zzerospace.store:8080/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email, // 유저가 입력한 이메일
//           password, // 유저가 입력한 패스워드
//         }),
//       });

//       // API 응답 처리
//       if (response.ok) {
//         const data = await response.json();
//         // 로그인 성공 시 이메일 저장
//         setUser({
//           email: data.email,
//           isAuthenticated: true,
//         });
//         setError(null); // 에러 초기화
//       } else {
//         // 로그인 실패 시 에러 처리
//         throw new Error("Login failed");
//       }
//     } catch (err) {
//       // 에러 발생 시 팝업 창 띄우기
//       setError("로그인에 실패했습니다. 다시 시도해주세요.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             이메일
//           </label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="이메일을 입력하세요"
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             패스워드
//           </label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="패스워드를 입력하세요"
//             required
//           />
//         </div>

//         {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

//         <button
//           onClick={handleLogin}
//           className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           로그인
//         </button>

//         {error && (
//           <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
//             <p>{error}</p>
//             <button
//               onClick={() => setError(null)}
//               className="mt-2 text-red-500 hover:text-red-700 focus:outline-none"
//             >
//               닫기
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginButton;
