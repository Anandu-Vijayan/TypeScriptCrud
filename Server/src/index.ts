import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router'


const app = express();

app.use(cors({
    credentials:true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());



const server = http.createServer(app)

server.listen(8080,()=>{
    console.log('Server listening on port:8080');
})

const MONGO_URL ="mongodb://0.0.0.0:27017/TsCrud"

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
if(mongoose.connect(MONGO_URL)){
    console.log("connected")
}

mongoose.connection.on('error',(error:Error)=> console.log(error));


app.use('/',router())