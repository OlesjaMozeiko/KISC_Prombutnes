import express, { request, response } from 'express';
import { JWT_SECRET } from '../config.js';
import { Employee } from '../models/employeeModel.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post( '/', async (request, response) => {
    try {
        const token = request.body.jwt;

        if(!token){
            return response.status(401).json({message: 'unauthorised 1'});
        }

        const verified = jwt.verify(token, JWT_SECRET);

        if(!verified){
            return response.status(401).json({message: 'unauthorised 2'});
        }

        return response.status(200).json({message: 'authorised', isAdmin: verified.isAdmin, id: verified.id});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
} );

export default router;