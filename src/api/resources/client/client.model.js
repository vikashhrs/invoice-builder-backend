import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, {
    versionKey: false
})
export default mongoose.model('Client', clientSchema);