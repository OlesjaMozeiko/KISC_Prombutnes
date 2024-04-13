import express from 'express';
import { Employee } from '../models/employeeModel.js';
import { Vacation } from '../models/vacationModel.js';
import mongoose from 'mongoose';
import { Event } from '../models/eventModel.js';

const router = express.Router();

// Get All
router.get('/', async (request, response) => {
    try {
        const events = await Event.find({});

        return response.status(200).json({
            count: events.length,
            data: events,
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

        const event = await Event.findById(id);

        return response.status(200).json(event);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

router.get('/:year/:month', async (request, response) => {
    try {
        const { year, month } = request.params;

        const events = await Event.find({
            startDate: {
                $gte: new Date(year, month - 1, 1), // for good routing/ default january 0
                $lt: new Date(year, month , 1)
            }
        }).sort({startDate: 'asc'});

        return response.status(200).json(events);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

// Add
router.post('/', async (request, response) => {
    try{
        if( !request.body.startDate || !request.body.endDate || !request.body.description ){
            return response.status(400).send({message: "All fields are required!"});
        }

        const newEvent = {
            startDate: request.body.startDate,
            endDate: request.body.endDate,
            description: request.body.description
        }

        const event = await Event.create(newEvent);

        return response.status(201).send(event);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Update
router.put('/:id', async (request, response) => {
    try{
        if( !request.body.startDate || !request.body.endDate || !request.body.description ){
            return response.status(400).send({message: "All fields are required!"});
        }

        const { id } = request.params;

        const result = await Event.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({message: 'Event not found'});
        }

        return response.status(200).json({message: 'Event updated successfully!'});
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

        const result = await Event.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message: 'Event not found'});
        }

        return response.status(200).json({message: 'Event deleted successfully!'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;

