import mongoose, { Schema } from "mongoose";
import { Employee } from "./employeeModel.js";
import { VacationType } from "./vacationTypeModel.js";

const vacationSchema = mongoose.Schema(
    {
        startDate: {type: Date, required: true},
        endDate: {type: Date, required: true},
        employee: {type: Schema.Types.ObjectId, ref: 'Employee'},
        substitute: {type: Schema.Types.ObjectId, ref: 'Employee'},
        type: {type: Schema.Types.ObjectId, ref: 'VacationType'},
        approved: {type: Boolean, default: false},
    }
);

export const Vacation = mongoose.model('Vacation', vacationSchema);