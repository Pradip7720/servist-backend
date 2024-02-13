import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import employeeRoutes from './src/routes/user.route';
import { notFound } from './src/helpers/middleware.notFound';
import registerRoutes from './src/routes/index';

dotenv.config();
require('./src/config/sequelize');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors());
registerRoutes(app);
// app.use('/', employeeRoutes);

app.use(notFound);
module.exports = app;
