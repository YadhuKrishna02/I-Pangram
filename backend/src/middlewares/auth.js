import AppError from "../utils/appError.js";
import jwt from 'jsonwebtoken'
import User from "../models/userModel.js";
import asyncHandler from 'express-async-handler';
import configKeys from "../config.js";



//check if user is authenticated

export const isAuthenticated = asyncHandler(async (req, res, next) => {

    const { token } = req.cookies;
    if (!token) throw new AppError('Not Authorized', HttpStatus.UNAUTHORIZED);

    //verify Token
    const decodedToken = jwt.verify(token, configKeys.JWT_SECRET);
    req.user = await User.findById(decodedToken.id);
    next()
})
