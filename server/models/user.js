const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password:
        {
            type: String,
            required: true,
            unique: true
        },
        name:
        {
            type: String,
            required: true
        },
        phoneNumber:
        {
            type: String,
        },
        email:
        {
            type: String,
            required: true,
            unique: true
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: true,
    }
);

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
})

userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;