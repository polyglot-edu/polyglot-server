import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';

export type ContextDocument = Document & {
    flowId: string;
    currentNodeId: string;
};

const contextSchema = new mongoose.Schema<ContextDocument>({
    _id: { 
        type: String,
        required: true,
        default: () => uuidv4(),
        validate: {
            validator: (id : string) => validator.isUUID(id),
            message: "Invalid UUID-v4"
        }
    },
    flowId: { type: String, required: true },
    currentNodeId: { type: String, required: true }
})

const Context = mongoose.model<ContextDocument>("Context", contextSchema);

export default Context;