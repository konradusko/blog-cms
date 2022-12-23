import express from 'express'
import {
    createServer as createViteServer
} from 'vite'
import proxy from 'express-http-proxy'
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()
app.use(express.static(path.join(__dirname, 'public')));
async function create_vite_server_node() {
    const AUTH_PORT = 3000
    const local_server_nodejs = `http://localhost:${AUTH_PORT}`
    app.post('/api/v1/add/smtp',proxy(`${local_server_nodejs}/api/v1/add/smtp`))
    app.post('/api/v1/delete/smtp',proxy(`${local_server_nodejs}/api/v1/delete/smtp`))
    app.post('/api/v1/get/smtp', proxy(`${local_server_nodejs}/api/v1/get/smtp`))
    app.post('/api/v1/send/test/email',proxy(`${local_server_nodejs}/api/v1/send/test/email`))
    app.get('/api/v1/get/domain/settings',proxy(`${local_server_nodejs}/api/v1/get/domain/settings`))
    app.post('/api/v1/sethost/domain/settings',proxy(`${local_server_nodejs}/api/v1/sethost/domain/settings`))
    app.post('/api/v1/change/domain/settings',proxy(`${local_server_nodejs}/api/v1/change/domain/settings`))
    const vite = await createViteServer({
        server: {
            middlewareMode: true
        },
        // appType: 'custom' // don't include Vite's default HTML handling middlewares
    })





    






    app.use(vite.middlewares)

    app.get('/',async(req,res)=>{
        res.sendFile(path.join("authPanel","index.html"))
    })

    app.listen(4000, () => {
        console.log('server listen 4000')
    })

}
create_vite_server_node()