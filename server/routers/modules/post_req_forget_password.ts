import { Router,Request,Response } from "express";

const post_req_forget_password:Router = Router()

post_req_forget_password.post('/forget/password',(req:Request,res:Response)=>{
    try {
        console.log(req.body)
        return res.status(400).json({message:'Wystąpił błąd',error:false})
    } catch (error) {
        return res.status(400).json({message:'Wystąpił błąd',error:true})
    }
})

export{
    post_req_forget_password
}