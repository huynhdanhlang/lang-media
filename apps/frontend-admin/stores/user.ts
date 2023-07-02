import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist/dist';
import { USER_STATE } from '../constant/keyStore.const';

const { persistAtom } = recoilPersist();
export const userState = atom({
  default: null,
  key: USER_STATE,
  effects_UNSTABLE: [persistAtom],
});
