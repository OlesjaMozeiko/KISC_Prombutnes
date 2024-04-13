import express from 'express';
import { HolidayType } from '../models/holidayTypeModel.js';

const router = express.Router();

// Get All
router.get('/', async (request, response) => {
    try {
        const holidayTypes = await HolidayType.find({});

        return response.status(200).json({
            count: holidayTypes.length,
            data: holidayTypes,
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

        const holidayType = await HolidayType.findById(id);

        return response.status(200).json(holidayType);
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

        const newHolidayType = {
            name: request.body.name
        }

        const holidayType = await HolidayType.create(newHolidayType);

        return response.status(201).send(holidayType);
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

        const result = await HolidayType.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({message: 'Holiday Type not found'});
        }

        return response.status(200).json({message: 'Holiday Type updated successfully!'});
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

        const result = await HolidayType.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message: 'Holiday Type not found'});
        }

        return response.status(200).json({message: 'Holiday Type deleted successfully!'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;