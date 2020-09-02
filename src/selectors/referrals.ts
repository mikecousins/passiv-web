import { AppState } from '../store';

export const referralCode = (state: AppState) => state.user_settings.data;
