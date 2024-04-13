import express, { request, response } from 'express';
import { JWT_SECRET } from '../config.js';
import { Employee } from '../models/employeeModel.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post( '/', async (request, response) => {
    try {
        
        const {username, password} = request.body;

        const employee = await Employee.findOne({username: username});

        if( !employee ){
            return response.status(404).send({message: 'User not found!'});
        }

        if( password != employee.password ){
            return response.status(404).send({message: 'Wrong password!'});
        }

        const payload = {
            id: employee._id,
            isAdmin: employee.isAdmin
        };

        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '24h'});

        return response.status(200).json({token: token});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
} );

export default router;