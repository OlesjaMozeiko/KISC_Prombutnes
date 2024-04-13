import express from 'express';
import { Employee } from '../models/employeeModel.js';
import { Vacation } from '../models/vacationModel.js';
import mongoose from 'mongoose';
import { VacationType } from '../models/vacationTypeModel.js';

const router = express.Router();

// Get All
router.get('/', async (request, response) => {
    try {
        const vacations = await Vacation.find({});

        return response.status(200).json({
            count: vacations.length,
            data: vacations,
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

        const vacation = await Vacation.findById(id);

        return response.status(200).json(vacation);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

// Add
router.post('/', async (request, response) => {
    try{
        if( !request.body.startDate || !request.body.endDate || !request.body.employee || !request.body.substitute || !request.body.type){
            return response.status(400).send({message: "All fields are required!"});
        }

        if( !mongoose.isValidObjectId(request.body.employee) || !mongoose.isValidObjectId(request.body.substitute) || !mongoose.isValidObjectId(request.body.type) ){
            return response.status(400).send({message: "Wrong epmloyee, substitute or vacation type id!"});
        }

        if( !Employee.exists({_id: request.body.employee}) || !Employee.exists({_id: request.body.substitute}) || !VacationType.exists({_id: request.body.type}) ){
            return response.status(400).send({message: "Unknown employee, substitute or vacation type!"});
        }

        const newVacation = {
            startDate: request.body.startDate,
            endDate: request.body.endDate,
            employee: request.body.employee,
            substitute: request.body.substitute,
            type: request.body.type
        }

        const vacation = await Vacation.create(newVacation);

        return response.status(201).send(vacation);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Update
router.put('/:id', async (request, response) => {
    try{
        if( !request.body.startDate || !request.body.endDate || !request.body.employee || !request.body.substitute || !request.body.type ){
            return response.status(400).send({message: "All fields are required!"});
        }

        if( !mongoose.isValidObjectId(request.body.employee) || !mongoose.isValidObjectId(request.body.substitute) || !mongoose.isValidObjectId(request.body.type) ){
            return response.status(400).send({message: "Wrong epmloyee, substitute or vacation type id!"});
        }

        if( !Employee.exists({_id: request.body.employee}) || !Employee.exists({_id: request.body.substitute}) || !VacationType.exists({_id: request.body.type}) ){
            return response.status(400).send({message: "Unknown employee, substitute or vacation type!"});
        }

        const { id } = request.params;

        const result = await Vacation.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({message: 'Vacation not found'});
        }

        return response.status(200).json({message: 'Vacation updated successfully!'});
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

        const result = await Vacation.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message: 'Vacation not found'});
        }

        return response.status(200).json({message: 'Vacation deleted successfully!'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;

// employee: 66035cb39bf7bb2c69dbc888
// substitute: 660363c8ef882c8ce483a029
// vactype: 66036372ef882c8ce483a025