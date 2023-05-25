import express from 'express';
import { viewTask } from '../controllers/employeeController/viewTask.js';
const employeeRouter = () => {
    const router = express.Router();

    router.get('/:_id', viewTask)

    return router;
};

export default employeeRouter;