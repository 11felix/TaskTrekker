import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        unique: true,
    },
    description: String,
    task: [
        {
            id: Number,
            title: String,
            description: String,
            stage: String,
            attachment: [
                { type: String, url: String }
            ],
            created_at: { type: Date, default: Date.now },
            updated_at: { type: Date, default: Date.now },
        }
    ]
}, { timestamps: true });

export default mongoose.model("Project", ProjectSchema);