import nodemailer from 'nodemailer'
export const create_transporter = (host:string,user:string,password:string)=>{
    const transporter = nodemailer.createTransport({
        host: host,
        port: 465,
        secure: true,
        auth:{
            user:user,
            pass:password
        }
    })
    return transporter
}