import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: true
    },

    completed: {
        type: String,
        enum: ["true", "false"],
        default: "false"
    },

    id_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"

    }
}, {timestamps: true})

export const Todo = mongoose.model("Todo", todoSchema)