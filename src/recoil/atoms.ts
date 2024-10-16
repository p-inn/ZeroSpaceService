import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    isAuthenticated: false,
    accessToken: "",
    refreshToken: "",
    userPK: "",
    email: "",
  },
});
