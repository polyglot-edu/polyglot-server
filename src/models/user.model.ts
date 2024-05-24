import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';

export type LearningPreferencesDocument = Document & {
    type:{
        text: boolean,
        video: boolean,
        audio: boolean,
        interactive: boolean,
    },
    location: {
        home: boolean,
        mooving: boolean,
        learning: boolean,
        other: boolean,
    },
    period: {
        morning: boolean,
        afternoon: boolean,
        evening: boolean,
        night: boolean,
    },
    lastingTime: {
        short: boolean,
        ordinary: boolean,
        long: boolean,
        longer: boolean,
    }
}

export type StatsDocument = Document & {
    readingTime: number,
    loginFrequency: number,
    loginDuration: number,
    averageResponseTime: number,
}


export type UserDocument = Document & {
    username: string;
    email: string;
    googleId: string;
    learningPreferences: LearningPreferencesDocument;
    stats: StatsDocument;
    contexts: string[];
    courses: string[];
};

const learningPreferencesSchema = new mongoose.Schema<LearningPreferencesDocument>({
    type: {
        text: { type: Boolean, default: false },
        video: { type: Boolean, default: false },
        audio: { type: Boolean, default: false },
        interactive: { type: Boolean, default: false },
    },
    location: {
        home: { type: Boolean, default: false },
        mooving: { type: Boolean, default: false },
        learning: { type: Boolean, default: false },
        other: { type: Boolean, default: false },
    },
    period: {
        morning: { type: Boolean, default: false },
        afternoon: { type: Boolean, default: false },
        evening: { type: Boolean, default: false },
        night: { type: Boolean, default: false },
    },
    lastingTime: {
        short: { type: Boolean, default: false },
        ordinary: { type: Boolean, default: false },
        long: { type: Boolean, default: false },
        longer: { type: Boolean, default: false },
    }
});

const statsSchema = new mongoose.Schema<StatsDocument>({
    readingTime: { type: Number, default: 0 },
    loginFrequency: { type: Number, default: 0 },
    loginDuration: { type: Number, default: 0 },
    averageResponseTime: { type: Number, default: 0 },
});

const userSchema = new mongoose.Schema<UserDocument>({
    _id: { 
        type: String,
        required: true,
        default: () => uuidv4(),
        validate: {
            validator: (id : string) => validator.isUUID(id),
            message: "Invalid UUID-v4"
        }
    },
    googleId: {type: String},
    username: { type: String, unique: true},
    email: { type: String},
    learningPreferences:{type: learningPreferencesSchema, default: {}},
    stats: {type: statsSchema, default: {}},
    contexts: [{type: String, ref: 'Context'}],
    courses: [{type: String, ref: 'Course'}],
})

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;