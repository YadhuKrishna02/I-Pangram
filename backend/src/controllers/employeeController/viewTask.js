import User from "../../models/userModel.js";
import Department from "../../models/departmentModel.js";
import HttpStatus from "../../types/httpStatus.js";
import AppError from "../../utils/appError.js";
import asyncHandler from 'express-async-handler';
import mongoose from "mongoose";
import { ObjectId } from "mongodb";


// import Department from "../../models/departmentModel.";
export const viewTask = asyncHandler(async (req, res) => {
    const { user_id } = req.params


    const department = await User.aggregate([
        {
            $match: {
                _id: new ObjectId(user_id)
            }
        },
        {
            $lookup: {
                from: "departments",
                localField: "departmentId",
                foreignField: "_id",
                as: "department"
            }
        },
        {
            $unwind: "$department"
        }
    ]);

    res.json({
        department,
        success: true,
        message: 'Department fetched successfully'
    })


});