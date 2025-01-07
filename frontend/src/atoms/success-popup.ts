import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

type SuccessState = { title: string; descriptionTop: string; descriptionBottom: string; fail?: boolean };

export const successPopupState = atom<SuccessState>({
    key: 'successPopupState',
    default: { title: '', descriptionTop: '', descriptionBottom: '', fail: false },
});

export const useSuccessPopupStateValue = () => useRecoilValue(successPopupState);
export const useSuccessPopupSetState = () => useSetRecoilState(successPopupState);
