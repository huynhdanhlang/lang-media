import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist/dist';

const { persistAtom } = recoilPersist();
export const userState = atom({
  default: null,
  key: 'userState',
  effects_UNSTABLE: [persistAtom],
});
