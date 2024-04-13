import express from 'express';
import { Employee } from '../models/employeeModel.js';
import { Department } from '../models/departmentModel.js';
import { Position } from '../models/positionModel.js';
import { Vacation } from '../models/vacationModel.js';
import mongoose from 'mongoose';

const router = express.Router();

// Get All
router.get('/', async (request, response) => {
    try {
        const employees = await Employee.find({});

        return response.status(200).json({
            count: employees.length,
            data: employees,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// Get By Id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const employee = await Employee.findById(id);

        return response.status(200).json(employee);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// Add
router.post('/', async (request, response) => {
    try {
        if (!request.body.username || !request.body.name || !request.body.surname || !request.body.department || !request.body.position || !request.body.password) {
            return response.status(400).send({ message: "All fields are required!" });
        }

        if (!mongoose.isValidObjectId(request.body.department) || !mongoose.isValidObjectId(request.body.position)) {
            return response.status(400).send({ message: "Wrong department or position id!" });
        }

        if (!Department.exists({ _id: request.body.department }) || !Position.exists({ _id: request.body.position })) {
            return response.status(400).send({ message: "Unknown department or position!" });
        }

        const newEmployee = {
            username: request.body.username,
            name: request.body.name,
            surname: request.body.surname,
            department: request.body.department,
            position: request.body.position,
            password: request.body.password
        }

        const employee = await Employee.create(newEmployee);

        return response.status(201).send(employee);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Update
router.put('/:id', async (request, response) => {
    try {
        if (!request.body.username || !request.body.name || !request.body.surname || !request.body.department || !request.body.position || !request.body.password) {
            return response.status(400).send({ message: "All fields are required!" });
        }

        if (!mongoose.isValidObjectId(request.body.department) || !mongoose.isValidObjectId(request.body.position)) {
            return response.status(400).send({ message: "Wrong department or position id!" });
        }

        if (!Department.exists({ _id: request.body.department }) || !Position.exists({ _id: request.body.position })) {
            return response.status(400).send({ message: "Unknown department or position!" });
        }

        const { id } = request.params;

        const result = await Employee.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Employee not found' });
        }

        return response.status(200).json({ message: 'Employee updated successfully!' });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Delete
router.delete('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const result = await Employee.findByIdAndDelete(id);

        

        if (!result) {
            return response.status(404).json({ message: 'Employee not found' });
        }
        await Vacation.deleteMany({employee: result._id});
        return response.status(200).json({ message: 'Employee deleted successfully!' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;