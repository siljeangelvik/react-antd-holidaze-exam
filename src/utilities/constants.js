export const API_BASE_URL = "https://nf-api.onrender.com/api/v1/holidaze";
export const API_LOGIN_URL = `${API_BASE_URL}/auth/login`;
export const API_REGISTER_URL = `${API_BASE_URL}/auth/register`;
export const API_PROFILE_URL = `${API_BASE_URL}/profiles`;
export const API_VENUES_URL = `${API_BASE_URL}/venues`;


export const profileToken = localStorage.getItem("accessToken");
export const profileName = localStorage.getItem("name");
export const profileEmail = localStorage.getItem("email");
export const profileAvatar = localStorage.getItem("avatar");
export const profileManager = localStorage.getItem("manager") ? "No" : "Yes" // if manager is true, then no, else yes


export const UPDATE_PROFILE_AVATAR = `${API_PROFILE_URL}/${profileName}/media`;
