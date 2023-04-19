export const API_BASE_URL = "https://nf-api.onrender.com/api/v1/holidaze";
export const API_LOGIN_URL = `${API_BASE_URL}/auth/login`;
export const API_REGISTER_URL = `${API_BASE_URL}/auth/register`;
export const API_PROFILE_URL = `${API_BASE_URL}/profiles`;

export const USER_IS_MANAGER = !! localStorage.getItem("manager");
export const USER_IS_LOGGED_OUT = ! localStorage.getItem("accessToken");
export const USER_IS_LOGGED_IN = !! localStorage.getItem("accessToken");