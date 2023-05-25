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

const app = express()

// Connect to MongoDB
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet({ xssFilter: true }));
app.use(morgan('dev'));

// Set up CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    next();
});

app.use(
    cors({
        origin: '*',
        methods: 'GET, POST, PUT, PATCH, DELETE',
        credentials: true,
    })
);

// Other middleware and routes
app.use('/api/auth', authRouter());
app.use('/api/manager', managerRouter());
app.use('/api/employee', employeeRouter());
app.use(errorHandlingMidlleware);

// Catch 404 and forward to error handler
app.all('*', (req, res, next) => {
    next(new AppError('Not found', 404));
});

// Start the server
app.listen(configKeys.PORT, () => {
    console.log(`Server listening on port ${configKeys.PORT}`);
});