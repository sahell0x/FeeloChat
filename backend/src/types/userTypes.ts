export type UserId = string | undefined;

export interface User  {
    email :string,
    _id:string,
    firstName?:string,
    lastName?:string,
    img?:string,
    profileSetup :boolean,
    password:string,
}

export type UserType = User | undefined |null;