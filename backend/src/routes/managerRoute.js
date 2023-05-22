import express from 'express';
import { addDepartment, editDepartment, assignTask, viewDepartment, deleteDepartment, viewUsers } from '../controllers/managerController/departmentController.js';
const managerRouter = () => {
    const router = express.Router();


    router.post('/', addDepartment)

    router.get('/view_department', viewDepartment)

    router.put('/edit_department/:id', editDepartment)

    router.delete('/delete_department/:id', deleteDepartment)

    router.get('/view_users', viewUsers)

    router.post('/assign_task', assignTask)


    return router;
};

export default managerRouter;