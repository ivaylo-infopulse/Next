import { atom } from 'recoil';

export const userState = atom<string | string[] | null | undefined>({
	key: 'userState',
	default: null,
});
