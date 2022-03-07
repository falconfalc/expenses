//@ts-check
import mongoose from 'mongoose';

const DocumentChunks = new mongoose.Schema({
    documentId: {
        type: String,
        required: true
    },
    chunkOrder: {
        type: Number,
        required: true,
    },
    chunk: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export default mongoose.model('DocumentChunks', DocumentChunks);
