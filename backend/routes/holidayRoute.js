import express from 'express';
import { Employee } from '../models/employeeModel.js';
import { Vacation } from '../models/vacationModel.js';
import mongoose from 'mongoose';
import { HolidayType } from '../models/holidayTypeModel.js';
import { Holiday } from '../models/holidayModel.js';

const router = express.Router();

// Get All
router.get('/', async (request, response) => {
    try {
        const holidays = await Holiday.find({});

        return response.status(200).json({
            count: holidays.length,
            data: holidays,
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

        const holiday = await Holiday.findById(id);

        return response.status(200).json(holiday);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

// Add
router.post('/', async (request, response) => {
    try{
        if( !request.body.startDate || !request.body.endDate || !request.body.description || !request.body.type ){
            return response.status(400).send({message: "All fields are required!"});
        }

        if( !mongoose.isValidObjectId(request.body.type) ){
            return response.status(400).send({message: "Wrong holiday type id!"});
        }

        if( !HolidayType.exists({_id: request.body.type}) ){
            return response.status(400).send({message: "Unknown holiday type!"});
        }

        const newHoliday = {
            startDate: request.body.startDate,
            endDate: request.body.endDate,
            description: request.body.description,
            type: request.body.type
        }

        const holiday = await Holiday.create(newHoliday);

        return response.status(201).send(holiday);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Update
router.put('/:id', async (request, response) => {
    try{
        if( !request.body.startDate || !request.body.endDate || !request.body.description || !request.body.type ){
            return response.status(400).send({message: "All fields are required!"});
        }

        if( !mongoose.isValidObjectId(request.body.type) ){
            return response.status(400).send({message: "Wrong holiday type id!"});
        }

        if( !HolidayType.exists({_id: request.body.type}) ){
            return response.status(400).send({message: "Unknown holiday type!"});
        }

        const { id } = request.params;

        const result = await Holiday.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({message: 'Holiday not found'});
        }

        return response.status(200).json({message: 'Holiday updated successfully!'});
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

        const result = await Holiday.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message: 'Holiday not found'});
        }

        return response.status(200).json({message: 'Holiday deleted successfully!'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;

