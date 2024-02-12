import { atom } from "recoil";

export const allCount = atom({
  key: "allCount",
  default: {
    Followers: 80000,
    Likes: 803000,
    Photos: 1400,
  },
});
