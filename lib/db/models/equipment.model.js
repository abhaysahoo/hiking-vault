import { models, Schema, model } from "mongoose"


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
            type: Number,
            unique: true,
            required: true,
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