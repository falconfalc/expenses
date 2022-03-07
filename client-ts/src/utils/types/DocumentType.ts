import { RandomUUIDOptions } from "crypto";

export type Document = {
    id: string,
    name: string,
    size: Number,
    chunksNum: Number,
    createdAt: string,
    updatedAt: string
};