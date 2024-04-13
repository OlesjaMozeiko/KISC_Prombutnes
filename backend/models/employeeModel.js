import mongoose, { Schema } from "mongoose";
import { Department } from "./departmentModel.js";
import { Position } from "./positionModel.js";

const employeeSchema = mongoose.Schema(
    {
        username: {type: String, required: true},
        name: {type: String, required: true},
        surname: {type: String, required: true},
        department: {type: Schema.Types.ObjectId, ref: 'Department'},
        position: {type: Schema.Types.ObjectId, ref: 'Position'},
        password: {type: String, required: true},
        isAdmin: {type: Boolean, default: false},
    },
    {
        timestamps: true,
    }
);

export const Employee = mongoose.model('Employee', employeeSchema);