import HttpStatus from "../types/httpStatus.js";
import asyncHandler from 'express-async-handler';
import User from "../models/userModel.js";
import Manager from "../models/managerModel.js";
import AppError from "../utils/appError.js";

export const signup = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        throw new AppError('existing email', HttpStatus.UNAUTHORIZED);
    }
    const user = await User.create(req.body);

    sendTokenResponse(user, 200, res)


});
export const managerSignup = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const managerExist = await Manager.findOne({ email });
    if (managerExist) {
        throw new AppError('existing email', HttpStatus.UNAUTHORIZED);
    }
    const manager = await Manager.create(req.body);

    sendTokenResponse(manager, 200, res)


});
export const signin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError('No such User', HttpStatus.UNAUTHORIZED);
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        throw new AppError('invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const token = await user.getJwtToken();
    user.password = null;
    res.status(HttpStatus.OK)
        .cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true })
        .json({ user, success: true, token, message: 'Successfully logged in' })



});
export const managerLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const manager = await Manager.findOne({ email });

    if (!manager) {
        throw new AppError('No such user', HttpStatus.UNAUTHORIZED);
    }

    const isMatch = await manager.comparePassword(password)
    if (!isMatch) {
        throw new AppError('invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const token = await manager.getJwtToken();
    manager.password = null;
    res.status(HttpStatus.OK)
        .cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true })
        .json({ manager, success: true, token, message: 'Successfully logged in' })


});

export const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        status: true,
        message: "logged out successfully"
    })
}

const sendTokenResponse = async (user, codeStatus, res) => {
    const token = await user.getJwtToken();
    res.status(codeStatus)
        .cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true })
        .json({ success: true, token, message: 'New User Created', user })
}