export const API_BASE_URL = "https://nf-api.onrender.com/api/v1/holidaze";
export const API_LOGIN = `${API_BASE_URL}/auth/login`;
export const API_REGISTER = `${API_BASE_URL}/auth/register`;
export const API_PROFILES = `${API_BASE_URL}/profiles`;
export const API_VENUES = `${API_BASE_URL}/venues`;

export const UPDATE_AVATAR = `${API_PROFILES}/${localStorage.getItem("name")}/media`;

/*
export const profileAccessToken = localStorage.getItem("accessToken");
export const profileName = localStorage.getItem("name");
export const profileEmail = localStorage.getItem("email");
export const profileAvatar = localStorage.getItem("avatar");
export const profileManager = localStorage.getItem("manager") ? "No" : "Yes" // if manager is true, then no, else yes
*/