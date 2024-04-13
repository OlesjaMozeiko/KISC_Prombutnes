import express from 'express';
import { Department } from '../models/departmentModel.js';

const router = express.Router();

// Get All
router.get('/', async (request, response) => {
    try {
        const departments = await Department.find({});

        return response.status(200).json({
            count: departments.length,
            data: departments,
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

        const department = await Department.findById(id);

        return response.status(200).json(department);
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

        const newDepartment = {
            name: request.body.name
        }

        const department = await Department.create(newDepartment);

        return response.status(201).send(department);
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

        const result = await Department.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({message: 'Department not found'});
        }

        return response.status(200).json({message: 'Department updated successfully!'});
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

        const result = await Department.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message: 'Department not found'});
        }

        return response.status(200).json({message: 'Department deleted successfully!'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;