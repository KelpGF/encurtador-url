import { Schema, model } from 'mongoose';

const SchemaModelURL = new Schema({
    hash: { type: String, required: true },
    originURL: { type: String, required: true },
    shortURL: { type: String, required: true },
});

export const URLModel = model('URLModel', SchemaModelURL);
