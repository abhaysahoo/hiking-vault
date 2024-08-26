import { model, models, Schema } from "mongoose";
import validator from "validator";

const UserSchema = new Schema(
    {
        businessId: { type: Schema.Types.ObjectId, ref: 'Business' },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, validate: [validator.isEmail, 'Invalid email address'] },
        image: { type: String },
        role: { type: String, enum: ['admin', 'guide'] },
    },
    {
        timestamps: true,
    }
);

const User = models?.User || model('User', UserSchema);

export default User;