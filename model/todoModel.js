const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, 'Todo must have a task'],
        trim: true,
    },
    publishDate: {
        type: Date,
        min: Date.now(),
    },
    targetDate: {
        type: Date,
        min: Date.now(),
    },
    expired: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
