import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import employeeRoute from './routes/employeeRoute.js';
import departmentRoute from './routes/departmentRoute.js';
import positionRoute from './routes/positionRoute.js';
import vacationTypeRoute from './routes/vacationTypeRoute.js';
import vacationRoute from './routes/vacationRoute.js'
import holidayTypeRoute from './routes/holidayTypeRoute.js';
import holidayRoute from './routes/holidayRoute.js';
import eventRoute from './routes/eventRoute.js';
import loginRoute from './routes/loginRoute.js';
import authRoute from './routes/authRoute.js';
import cors from 'cors';

const app = express();

// Middleware
app.use( express.json() ); // conert request to JS object
//app.use( cors() ); // time
app.use( cors({ 
        origin: 'http://localhost:5173',  
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    }) 
); // Handle CORS policy. Allow actions only for localhost (our server)



app.get('/', (request,response)=>{
    //console.log(request);
    return response.status(234).send('Welcome');
});

// Use Route to 
app.use('/employee', employeeRoute);
app.use('/department', departmentRoute);
app.use('/position', positionRoute);
app.use('/vacationtype', vacationTypeRoute);
app.use('/vacation', vacationRoute);
app.use('/holidaytype', holidayTypeRoute);
app.use('/holiday', holidayRoute);
app.use('/event', eventRoute);
app.use('/login', loginRoute);
app.use('/auth', authRoute );

// Connect to MongoDB 
mongoose.connect(mongoDBURL)
    .then(()=>{
        console.log('App is connected to database');
        app.listen(PORT, ()=>{
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error)
    });