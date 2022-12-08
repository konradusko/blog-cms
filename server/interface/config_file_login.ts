export interface ConfigFile_rate_limit{
    max_request:number,
    time_in_minutes:number,
    message:string,
    legacyHeaders:boolean,
    standardHeaders:boolean
}