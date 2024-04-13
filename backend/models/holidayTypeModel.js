import mongoose from "mongoose";

const holidayTypeSchema = mongoose.Schema(
    {
        name: {type: String, required: true}
    }
);

export const HolidayType = mongoose.model('HolidayType', holidayTypeSchema);