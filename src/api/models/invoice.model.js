import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    item: {
        type: String,
        require: true
    },
    qty: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    due: {
        type: Date,
        required: true
    },
    rate: {
        type: Number
    },
    tax: {
        type: Number
    }
}, {
    versionKey: false
})

export default mongoose.model('Invoice', invoiceSchema);