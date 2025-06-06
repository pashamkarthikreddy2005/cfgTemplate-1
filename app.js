require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const messageRoutes= require('./routes/messageRoutes')
const paymentRoutes= require('./routes/paymentRoutes')

mongoose.connect(process.env.MONGODB_CONNECTION);

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/message',messageRoutes)
app.use("/payment",paymentRoutes)


app.listen(5000, () => {
  console.log('Server started on port 5000');
});
