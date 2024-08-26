import { Schema, model, models } from 'mongoose';
import validator from 'validator';

const BusinessSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },   
    phone: {
        type: String,
        required: true,
        unique: true, // Assuming each business phone number should be unique
        validate: {
            validator: function (v) {
                return validator.isMobilePhone(v, 'any', { strictMode: true });
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },

}, { timestamps: true });

const Business = models?.Business || model('Business', BusinessSchema);

export default Business;
