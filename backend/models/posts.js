const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        category: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            // required: true,
        },
        creationDate: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: false }
);

module.exports = mongoose.model("Post", PostSchema);
