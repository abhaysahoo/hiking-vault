import { models, Schema, model } from "mongoose"
import { customAlphabet } from 'nanoid';

// Define a custom alphabet for numeric characters with a length of 10 digits
const nanoid = customAlphabet('1234567890', 10);

const EquipmentSchema = new Schema(
    {
        name: { 
            type: String, 
            required: true 
        },
        businessId: {
            type: Schema.Types.ObjectId,
            ref: 'Business',
            required: true,
        },
        category: {
            type: String,
        },
        serialNumber: {
            type: String,
            unique: true,
            required: true,
            default: () => nanoid(),
        },
        image: {
            type: String,
        },
        status: {
            type: String,
            enum: ['available', 'in use'],
            default: 'available',
        },
        trips: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Trip',
            },
        ]
    },
    {
        timestamps: true,
    }
)

const Equipment = models?.Equipment || model('Equipment', EquipmentSchema);

export default Equipment;