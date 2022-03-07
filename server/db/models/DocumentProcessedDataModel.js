//@ts-check
import mongoose from 'mongoose';

const DocumentProcessedData = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    documentId: {
        type: String,
        required: true,
    },
    fullData: {
        type: [String],
        required: true,
    },
    sum: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    transactionType: {
        type: String,
        required: true,
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('DocumentProcessedData', DocumentProcessedData);
