import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    email: "",
    isAuthenticated: false,
  },
});
