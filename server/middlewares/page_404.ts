import { Request, Response, NextFunction} from "express"

export const page_404 = (req:Request,res:Response,next:NextFunction)=>{
    if(req.method == 'GET')
        return res.status(404).send(`404 page`)
    return res.status(404).json({message:'Taka strona nie istnieje',error:true})
}