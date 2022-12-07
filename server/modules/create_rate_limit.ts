import rateLimit,{Options} from 'express-rate-limit'
import { Request, Response , NextFunction} from 'express'
import { ConfigFile_rate_limit } from '../interface/config_file_login'
export const create_rate_limit = (config_router:ConfigFile_rate_limit)=>rateLimit({
    windowMs: config_router.time_in_minutes * 60 * 1000,
	max: config_router.max_request, 
	standardHeaders: config_router.standardHeaders, 
	legacyHeaders: config_router.legacyHeaders, 
    message:config_router.message,
    handler:(req:Request,res:Response,next:NextFunction,options:Options)=>{
        res.status(options.statusCode).json({message:options.message,error:true})
    }
})