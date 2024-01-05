const express = require('express')
const colors = require('colors')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//dotenv config
dotenv.config();

//mongodb connection
connectDB();

//rest obj
const app = express()

//middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/users', require('./routes/userRoutes'))

//port
const port = process.env.PORT||4200

//listen port
app.listen(port, () => {
    console.log(`Server is running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`);
})