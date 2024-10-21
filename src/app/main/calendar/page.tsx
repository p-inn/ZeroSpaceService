"use client";

import React from "react";
import Calendar from "@/components/Calendar";
import { Suspense } from "react";

const calendarPage = () => {
  return (
    <Suspense>
      <Calendar />
    </Suspense>
  );
};

export default calendarPage;
