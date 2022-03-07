//@ts-check
import mongoose from 'mongoose';

// TODO: Make month and year mandatory after enrinch form with data is done
const Document = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    chunksNum: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Document', Document);
