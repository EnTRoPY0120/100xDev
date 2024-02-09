import { atom, selector } from "recoil";

export const networkAtom = atom({
  key: "networkAtom",
  default: 104,
});

export const jobAtom = atom({
  key: "jobAtom",
  default: 0,
});

export const messagingAtom = atom({
  key: "messagingAtom",
  default: 0,
});

export const notificationAtom = atom({
  key: "notificationAtom",
  default: 12,
});

export const totalNotificationSelector = selector({
  key: "totalNotificationSelector",
  get: ({ get }) => {
    const networkNotificationCount = get(networkAtom);
    const jobAtomCount = get(jobAtom);
    const messagingAtomCount = get(messagingAtom);
    const notificationAtomCount = get(notificationAtom);
    return (
      networkNotificationCount +
      jobAtomCount +
      messagingAtomCount +
      notificationAtomCount
    );
  },
});
