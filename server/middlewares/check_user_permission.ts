import {Request, Response, NextFunction} from 'express'
import { User } from '../interface/user'
import { Role } from '../enums/role_enum'
export const required_root_user = (req:Request,res:Response,next:NextFunction)=>{
    try {
        if(!res.locals.user)
            return res.status(401).json({ message: 'Brak wymaganych uprawnień!', error: true})
        if((res.locals.user as User).role != Role.root)
            return res.status(401).json({ message: 'Brak wymaganych uprawnień!', error: true})
        return next()
    } catch (error) {
        return res.status(401).json({ message: 'Brak wymaganych uprawnień!', error: true})
    }
}