import { Schema, model, models } from 'mongoose';

const TripSchema = new Schema({
    businessId: {
        type: Schema.Types.ObjectId,
        ref: 'Business',
        required: true,
    },
    guideId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    equipmentsUsed: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Equipment',
        },
    ],
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed'],
        default: 'upcoming',
    },
}, { timestamps: true });

const Trip = models?.Trip || model('Trip', TripSchema);

export default Trip;
