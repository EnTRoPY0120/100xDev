import { atom, selector } from 'recoil';
import axios from 'axios';

export const githubInfo = atom({
  key: "githubInfo",
  default: selector({
    key: "githubInfoObject",
    get: async () => {
      try {
        const res = await axios.get('https://api.github.com/users/EnTRoPY0120');
        return res.data;
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        return {}; // Return an empty object in case of an error
      }
    },
  }),
});
