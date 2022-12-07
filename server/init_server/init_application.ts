import express, { Express } from 'express'
import * as helmet from "helmet";
import cookieParser from 'cookie-parser'
import ejs from 'ejs'
import path from 'path'
const app: Express = express()
app.use(helmet.contentSecurityPolicy());
app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
app.set('view engine', 'ejs')
app.engine('html', ejs.renderFile);
app.use(cookieParser())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', 1);



export{app}