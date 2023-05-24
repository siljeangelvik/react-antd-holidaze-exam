/*      API URLS    */
// https://nf-api.onrender.com/api/v1/holidaze/venues/73a67858-9f1b-4f46-a0a9-6827655bafc3?_bookings=true
export const API_BASE_URL = "https://nf-api.onrender.com/api/v1/holidaze";
export const API_LOGIN = `${API_BASE_URL}/auth/login`;
export const API_REGISTER = `${API_BASE_URL}/auth/register`;
export const API_BOOKINGS = `${API_BASE_URL}/bookings`;
export const API_VENUES = `${API_BASE_URL}/venues`;
export const API_PROFILES = `${API_BASE_URL}/profiles`;
export const API_PROFILE = `${API_BASE_URL}/profiles/${localStorage.getItem("name")}`;
export const API_PROFILE_AVATAR = `${API_PROFILES}/${localStorage.getItem("name")}/media`;
export const API_PROFILE_BOOKINGS = `${API_BASE_URL}/profiles/${localStorage.getItem("name")}/bookings`;
export const API_PROFILE_VENUES = `${API_BASE_URL}/profiles/${localStorage.getItem("name")}/venues`;