import mongoose, { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,

        },
        lastName: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please add a valid email'],
        },
        gender: {
            type: String,
            maxlength: 3,
            required: true,
        },
        hobbies: {
            type: Array,
            required: true
        },
        departmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Department'
        },

        password: {
            type: String,
            trim: true,
            required: true,
            minlength: 6,
        },
    },
    { timestamps: true }
);

//password hashing
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//compare user password

userSchema.methods.comparePassword = async function (enteredPassword) {

    return await bcrypt.compare(enteredPassword, this.password)
}

//generate a jwt token

userSchema.methods.getJwtToken = function () {

    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: 3600 })
}

const User = model('User', userSchema);
export default User;
