const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, 'Todo must have a task'],
        trim: true,
    },
    publishDate: {
        type: Date,
        default: Date.now(),
    },
    targetDate: {
        type: Date,
        required: [true, 'Todo must have target date'],
        min: Date.now(),
    },
    expired: Boolean,
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
