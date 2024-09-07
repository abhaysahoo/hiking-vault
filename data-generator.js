import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import Equipment from './lib/db/models/equipment.model.js';
import connectToDatabase from './lib/db/mongoose.js';

function generateSerialNumber() {
    return String(Math.floor(1000000000 + Math.random() * 9000000000));
}

// Function to generate 100 mock equipment items
function generateMockEquipments() {
    const mockEquipments = [];

    for (let i = 0; i < 100; i++) {
        mockEquipments.push({
            name: faker.commerce.productName(),  // Generate random product name
            businessId: new mongoose.Types.ObjectId('66cb6baac772806af0c5ea31'),  // Use the specific businessId
            category: faker.commerce.department(),  // Random category
            image: null,  // Image is null as per your requirement
            serialNumber: generateSerialNumber(),  // Random 10-digit serial number
            status: faker.helpers.arrayElement(['available', 'in use']),  // Random status
            trips: [],  // Empty array as per your requirement
        });
    }

    return mockEquipments;
}

async function insertMockEquipments() {
    try {
        // Connect to MongoDB
        await connectToDatabase();

        console.log('Connected to MongoDB');

        const equipments = generateMockEquipments();

        // Insert the generated mock equipments into the collection
        await Equipment.insertMany(equipments);

        console.log('Mock equipment data inserted successfully');

        // Disconnect from MongoDB
        await mongoose.disconnect();
    } catch (error) {
        console.error('Error inserting mock equipment:', error);
    }
}

// Run the insertion
insertMockEquipments();
