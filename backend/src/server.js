import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './connection/connection.js';
import configKeys from './config.js';
import AppError from './utils/appError.js';
import errorHandlingMidlleware from './middlewares/errorHandlingMiddleware.js';
import authRouter from './routes/auth.js'
import managerRouter from './routes/managerRoute.js'
import employeeRouter from './routes/employeeRoutes.js';
import { isAuthenticated } from './middlewares/auth.js';

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet({ xssFilter: true }));
app.use(morgan('dev'));

app.listen(configKeys.PORT, () => {
    console.log(`Server listening on port ${configKeys.PORT}.`);
});
//connecting mongoDb
connectDB();


app.use(
    cors({
        origin: '*',
        methods: 'GET POST PUT PATCH DELETE',
        credentials: true,
    })
);

app.use('/api/auth', authRouter())
app.use('/api/manager', managerRouter())
app.use('/api/employee', employeeRouter())
app.use(errorHandlingMidlleware);
// catch 404 and forward to error handler
app.all('*', (req, res, next) => {
    next(new AppError('Not found', 404));
});

