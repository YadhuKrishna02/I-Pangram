import User from "../../models/userModel.js";
import Department from "../../models/departmentModel.js";
import HttpStatus from "../../types/httpStatus.js";
import AppError from "../../utils/appError.js";
import asyncHandler from 'express-async-handler';
import mongoose from "mongoose";
import { ObjectId } from "mongodb";


// import Department from "../../models/departmentModel.";
export const viewTask = asyncHandler(async (req, res) => {

    const { _id } = req.params


    const user = await User.findById(_id);
    if (!user.departmentId) {
        res.json({
            success: false
        })
    }
    else {

        const departmentId = user.departmentId;

        const department = await Department.findById(departmentId);
        console.log(department, 'ooooooooooo')

        res.json({
            department,
            success: true,
            message: 'Department fetched successfully'
        })
    }




});