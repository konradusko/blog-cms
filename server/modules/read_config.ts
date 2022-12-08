import fs from 'fs'
import {ConfigFile_rate_limit} from '../interface/config_file_login'
import {SystemConfig} from '../interface/config_system'
interface ConfigFile{
    login_rate_limit:ConfigFile_rate_limit,
    forget_password_rate_limit:ConfigFile_rate_limit,
    system:SystemConfig
}
const config:ConfigFile = JSON.parse(fs.readFileSync('./config.json').toString())
export{
    config
}