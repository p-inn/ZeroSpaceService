// import Image from "next/image";

// import Calendar from "@/components/Calendar";
// import Sidebar from "@/components/Sidebar";
import LoginButton from "@/components/LoginButton";

export default function Home() {
  // return (
  //   <div>
  //     <h1>
  //       <Sidebar></Sidebar>
  //     </h1>
  //     <h1>
  //       <Calendar></Calendar>
  //     </h1>
  //     <h1>
  //       <LoginButtontton></LoginButton>
  //     </h1>
  //   </div>
  // );
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">환영합니다</h1>
        <p className="text-center mb-6">로그인하세요</p>
        <LoginButton />
      </div>
    </div>
  );
}
