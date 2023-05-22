import { signup, signin, managerSignup, managerLogin } from '../controllers/authController.js';
import express from 'express';

const authRouter = () => {
    const router = express.Router();

    router.post('/signup', signup);

    router.post('/login', signin);

    router.post('/manager/signup', managerSignup);

    router.post('/manager/login', managerLogin);



    // router.post('/user_login', controller.loginUser);


    return router;
};

export default authRouter;