import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
const exphbs  = require('express-handlebars');
const path = require('path')
import { notFound } from './src/helpers/middleware.notFound';
import registerRoutes from './src/routes/index';


dotenv.config();
require('./src/config/sequelize');

const app = express();
// app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'templates', 'emails'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin: "*.trustedwebsite.com"
}));
registerRoutes(app);
// app.use('/', employeeRoutes);

app.use(notFound);
module.exports = app;

