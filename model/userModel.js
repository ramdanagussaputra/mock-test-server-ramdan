const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User must have a name'],
        trim: true,
        lowercase: true,
    },
    password: {
        type: Number,
        required: [true, 'User must have a password'],
        min: [4, 'Password must contains of 4 number'],
        max: [4, 'Password must contains of 4 number'],
    },
});

// PRE HOOKS
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
