import fs from 'fs'
import {ConfigFile_rate_limit} from '../interface/config_file_login'
interface ConfigFile{
    login_rate_limit:ConfigFile_rate_limit
}
const config:ConfigFile = JSON.parse(fs.readFileSync('./config_rate_limit.json').toString())
export{
    config
}