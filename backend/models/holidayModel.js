import mongoose, { Schema } from "mongoose";
import { HolidayType } from "./holidayTypeModel.js";

const holidaySchema = mongoose.Schema(
    {
        startDate: {type: Date, required: true},
        endDate: {type: Date, required: true},
        description: {type: String, required: true},
        type: {type: Schema.Types.ObjectId, ref: 'HolidayType'},
    }
);

export const Holiday = mongoose.model('Holiday', holidaySchema);