import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import registerRoutes from './src/routes/index';
// app.js

import typesenseClient from '././src/config/typesense'; 

dotenv.config();
require('./src/config/sequelize');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
    origin: process.env.ALLOW_ORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
registerRoutes(app);


module.exports = app;
