"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/queryClient";
import { RecoilRoot } from "recoil";

interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ children }) => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </RecoilRoot>
  );
};

export default ClientWrapper;
