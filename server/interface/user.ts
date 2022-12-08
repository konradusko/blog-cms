export interface User {
    id:number,
    login:string,
    password:string,
    email:string,
    createdAt:string,
    role:string,
    confirmEmail:boolean,
    authToken:string,
    emailConfirmToken:string,
    forgetPasswordToken:string
}
