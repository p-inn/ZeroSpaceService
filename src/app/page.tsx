// import Image from "next/image";

import Calendar from "@/components/Calendar";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div>
      <h1>
        <Sidebar></Sidebar>
      </h1>
      <h1>
        <Calendar></Calendar>
      </h1>
    </div>
  );
}
