import mongoose from 'mongoose';
import { mongoDBURL } from '../config.js';

import { HolidayType } from '../models/holidayTypeModel.js';
import { Holiday } from '../models/holidayModel.js';


// Connect to MongoDB
mongoose.connect(mongoDBURL)
    .then(() => {
        populateDatabase();

    })
    .catch((error) => {
        console.log(error)
    });





async function populateDatabase() {
    try {
        // Delete all documents before filling

        const currentDate = new Date();
        await Holiday.deleteMany();
        await HolidayType.deleteMany();
        const countryHoliday = await HolidayType.create({name: 'Valsts svētki'});
        let newHolidays;
        await fetch(`https://openholidaysapi.org/PublicHolidays?countryIsoCode=LV&languageIsoCode=LV&validFrom=${currentDate.getFullYear()}-01-01&validTo=${currentDate.getFullYear()}-12-31`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                //console.log( data );
                //
                newHolidays = data.map((holiday) => ({
                    startDate: holiday.startDate,
                    endDate: holiday.endDate,
                    description: holiday.name[0].text,
                    type: countryHoliday._id
                }));

                

                //console.log(newHolidays);

            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            })

        await Holiday.insertMany(newHolidays);
        // Insert data to collection
        //await YourModel.insertMany(data);

        //console.log('database is filled.');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // End connection to MongoDB
        mongoose.connection.close();
    }
}

// Call funtion to fill database 
//populateDatabase();
