import mongoose, { Schema } from "mongoose";

const eventSchema = mongoose.Schema(
    {
        startDate: {type: Date, required: true},
        endDate: {type: Date, required: true},
        description: {type: String, required: true}
    }
);

export const Event = mongoose.model('Event', eventSchema);