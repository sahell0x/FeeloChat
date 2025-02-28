export type UserId = string | undefined;

export interface User  {
    email :string,
    _id:any,
    firstName?:string,
    lastName?:string,
    img?:string,
    profileSetup :boolean,
    password:string,
    publicKey:string,
    isGuest:boolean,

}


export type UserType = User | undefined |null;