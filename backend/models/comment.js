const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    courseCode: {type: String, required: true },
    courseName: { type: String},
    Program: { type: String},
    semester: { type: String },
    content: { type: String, required: true }
});

module.exports = mongoose.model('Comment', commentSchema);