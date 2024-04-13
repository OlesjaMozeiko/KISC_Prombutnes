import mongoose from "mongoose";

const vacationTypeSchema = mongoose.Schema(
    {
        name: {type: String, required: true}
    }
);

export const VacationType = mongoose.model('VacationType', vacationTypeSchema);