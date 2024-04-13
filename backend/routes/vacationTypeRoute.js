import express from 'express';
import { VacationType } from '../models/vacationTypeModel.js';

const router = express.Router();

// Get All
router.get('/', async (request, response) => {
    try {
        const vacationTypes = await VacationType.find({});

        return response.status(200).json({
            count: vacationTypes.length,
            data: vacationTypes,
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

        const vacationType = await VacationType.findById(id);

        return response.status(200).json(vacationType);
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

        const newVacationType = {
            name: request.body.name
        }

        const vacationType = await VacationType.create(newVacationType);

        return response.status(201).send(vacationType);
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

        const result = await VacationType.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({message: 'Vacation Type not found'});
        }

        return response.status(200).json({message: 'Vacation Type updated successfully!'});
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

        const result = await VacationType.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message: 'Vacation Type not found'});
        }

        return response.status(200).json({message: 'Vacation Type deleted successfully!'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;