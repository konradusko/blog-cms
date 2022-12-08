import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../modules/read_config'
import { Session_token } from '../interface/session_token'
import { sqlite_database } from '../database/async/async_sqlite'
import { User } from '../interface/user'
const compare_session_tokens = (login:string,id:number,token:string)=> new Promise<User>(async(res,rej)=>{
    try {
        const sql_find_user = `SELECT * FROM Users WHERE login = ? and id =?`
        const values_sql = [login,id]
        const user = await sqlite_database
        ?.get_promisify(sql_find_user,values_sql )
        if((user as User).authToken == token)
            return res(user as User)
        return rej()
    } catch (error) {
        return rej()
    }
})
export const required_session_post_request =  async(req:Request,res:Response,next:NextFunction)=>{
    try {
        if (!('token' in req.cookies))    
        return res.status(401).json({ message: 'Twoja sesja wygasła lub jest nieprawidłowa', error: true })
        const {token} = req.cookies
        const data_from_token= jwt.verify(token,config.system.token_setting_user_session.private_key)
        res.locals.user =  await compare_session_tokens((data_from_token as Session_token).login,(data_from_token as Session_token).id,token)
        return next()
    } catch (error) {
        return res.clearCookie('token').status(401).json({ message: 'Twoja sesja wygasła lub jest nieprawidłowa', error: true ,redirect:true})
    }
}
export const required_session_get_request = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        if (!('token' in req.cookies))    
            return res.status(401).redirect('/admin/login')
        const {token} = req.cookies
        const data_from_token= jwt.verify(token,config.system.token_setting_user_session.private_key)
        res.locals.user =  await compare_session_tokens((data_from_token as Session_token).login,(data_from_token as Session_token).id,token)
        return next()
    } catch (error) {
        return res.clearCookie('token').status(302).redirect(`/admin/login`)
    }
}
export const session_not_required_post_request = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        if (!('token' in req.cookies))    
            return next()
        const {token} = req.cookies
        const data_from_token= jwt.verify(token,config.system.token_setting_user_session.private_key)
        console.log(token)
        await compare_session_tokens((data_from_token as Session_token).login,(data_from_token as Session_token).id,token)
        console.log('ekhm')
        return res.status(401).json({ message: 'Nie możesz wykonać tej operacji jak jestes zalogowany', error: true })
    } catch (error) {
        console.log(error)
        return next()
    }
}
export const session_not_required_get_request = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        if (!('token' in req.cookies))    
            return next()
        const {token} = req.cookies
        const data_from_token= jwt.verify(token,config.system.token_setting_user_session.private_key)
        await compare_session_tokens((data_from_token as Session_token).login,(data_from_token as Session_token).id,token)
        return res.status(302).redirect(`/home`)
    } catch (error) {
        return next()
    }
}