import Department from "../../models/departmentModel.js";
import AppError from "../../utils/appError.js";
import HttpStatus from "../../types/httpStatus.js";
import asyncHandler from 'express-async-handler';
import User from "../../models/userModel.js";

export const addDepartment = asyncHandler(async (req, res) => {

    const departmentExist = await Department.findOne(req.body);
    if (departmentExist) {
        throw new AppError('department already exists', HttpStatus.BAD_REQUEST)
    }

    const department = await Department.create(req.body);
    if (!department) throw new AppError('department not created', HttpStatus.BAD_REQUEST)
    res.status(HttpStatus.OK).json({
        status: true,
        department,
        message: "Department created successfully"
    })

})
export const viewDepartment = asyncHandler(async (req, res) => {

    const departments = await Department.find();

    res.status(HttpStatus.OK).json({
        status: true,
        message: "Department fetched successfully",
        departments
    })
})
export const editDepartment = asyncHandler(async (req, res) => {

    const departmentId = req.params.id;
    const updatedFields = req.body;

    const updatedDepartment = await Department.findByIdAndUpdate(
        { _id: departmentId },
        { $set: updatedFields },
        { new: true }

    );
    res.status(HttpStatus.OK).json({
        status: true,
        message: "Department edited successfully",
        updatedDepartment
    })


})
export const deleteDepartment = asyncHandler(async (req, res) => {

    const departmentId = req.params.id;


    const department = await Department.findByIdAndDelete(
        { _id: departmentId }
    );
    res.status(HttpStatus.OK).json({
        status: true,
        message: "Department deleted successfully"
    })


})

export const findDepartment = asyncHandler(async (req, res) => {
    const department = await Department.find()
    if (!department) throw new AppError('department not found', HttpStatus.NOT_FOUND)

    res.status(HttpStatus.OK).json({
        department,
        status: true,

    })
})




export const viewUsers = asyncHandler(async (req, res) => {

    const employees = await User.aggregate([
        {
            $match: {
                departmentId: { $exists: false }
            }
        }
    ]);
    if (!employees) {
        res.json({
            message: "All users have assigned"
        })
    }



    res.status(HttpStatus.OK).json({
        employees,
        status: true,

    })
});
export const assignTask = asyncHandler(async (req, res) => {

    const departmentId = req.body.payload.departmentId
    const _id = req.body.payload._id
    console.log(req.body, 'bodyyyyyyyyyy')
    console.log(req.body.payload._id, 'user_id')


    const user = await User.findOneAndUpdate(
        { _id: _id },
        { $set: { departmentId: departmentId } },
        { new: true }

    );
    console.log(user, 'userrrrrrrrrrrr')
    res.status(HttpStatus.OK).json({
        user,
        status: true,
        message: 'Task assigned'

    })

    // Rest of your code

});
export const listAllEmployees = asyncHandler(async (req, res) => {

    const empDeptDetails = await User.find().populate('departmentId');
    res.status(HttpStatus.OK).json({
        empDeptDetails,
        status: true,
        message: 'Fetched successfully'

    })

    // Rest of your code

});
