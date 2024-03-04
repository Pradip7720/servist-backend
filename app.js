import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import registerRoutes from './src/routes/index';

dotenv.config();
require('./src/config/sequelize');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

registerRoutes(app);


module.exports = app;
