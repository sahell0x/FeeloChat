export const HOST =  import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "api/auth";

export const USER_BASE_ROUTE = "api";

export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;

export const SIGNIN_ROUTE = `${AUTH_ROUTES}/signin`;

export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;

export const GUEST_ROUTE = `${AUTH_ROUTES}/guest`;

export const SEND_OTP_ROUTE = `${AUTH_ROUTES}/send-otp`;

export const USER_ROUTE = `${USER_BASE_ROUTE}/user`;

export const SEARCH_ROUTE = `${USER_ROUTE}/search`;

export const MESSAGE_ROUTE = `${USER_ROUTE}/message`;

export const CONTACT_ROUTE = `${USER_ROUTE}/contact`;

export const CONTACT_INFO_ROUTE = `${CONTACT_ROUTE}/info`;

export const USER_PROFILE_ROUTE = `${USER_ROUTE}/profile`;