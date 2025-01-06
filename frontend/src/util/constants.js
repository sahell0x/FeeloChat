export const HOST =  import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "api/auth";
export const USER_BASE_ROUTE = "api/auth";


export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;

export const SIGNIN_ROUTE = `${AUTH_ROUTES}/signin`;

export const USER_ROUTE = `${USER_BASE_ROUTE}/user`;