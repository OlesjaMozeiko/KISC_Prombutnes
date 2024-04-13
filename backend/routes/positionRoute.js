import express from 'express';
import { Position } from '../models/positionModel.js';

const router = express.Router();

// Get All
router.get('/', async (request, response) => {
    try {
        const positions = await Position.find({});

        return response.status(200).json({
            count: positions.length,
            data: positions,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

// Get By Id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const position = await Position.findById(id);

        return response.status(200).json(position);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

// Add
router.post('/', async (request, response) => {
    try{
        if( !request.body.name ){
            return response.status(400).send({message: "All fields are required!"});
        }

        const newPosition = {
            name: request.body.name
        }

        const position = await Position.create(newPosition);

        return response.status(201).send(position);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Update
router.put('/:id', async (request, response) => {
    try{
        if( !request.body.name){
            return response.status(400).send({message: "All fields are required!"});
        }

        const { id } = request.params;

        const result = await Position.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({message: 'Position not found'});
        }

        return response.status(200).json({message: 'Position updated successfully!'});
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Delete
router.delete('/:id', async (request, response) => {
    try {
        
        const { id } = request.params;

        const result = await Position.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message: 'Position not found'});
        }

        return response.status(200).json({message: 'Position deleted successfully!'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;