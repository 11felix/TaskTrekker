import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowerCase: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    }
});

export default mongoose.model("User", UserSchema);