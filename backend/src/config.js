import dotenv from 'dotenv';
dotenv.config();

const configKeys = {
    PORT: process.env.PORT,
    MONGO_DB_URL: process.env.DATABASE,
    JWT_SECRET: process.env.JWT_SECRET,

};

export default configKeys;