import mongoose from 'mongoose';
import mongoosepaginate from 'mongoose-paginate';
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
    },
    client: {
        ref: 'Client',
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    versionKey: false
})
invoiceSchema.plugin(mongoosepaginate);
export default mongoose.model('Invoice', invoiceSchema);