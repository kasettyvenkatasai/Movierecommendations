const express = require('express');
const mongoose =require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {getmongoconnect} = require('./connection/connection');
const app =express();
const router = require('./routes/route');
const path =  require('path');



const allowedOrigins = [
  'http://localhost:5173',
  'http://frontend:5173',
  'https://campuscare-2.onrender.com',
  'http://localhost:5000',
  'https://campuscare-1.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

getmongoconnect('mongodb+srv://kasettyvenkatasai:Saivenkat%401347@clusterm.mi2vsvo.mongodb.net/?retryWrites=true&w=majority&appName=ClusterM', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected"); 
    })
    .catch((err) => {
        console.log("MongoDB connection error: " + err);
    });



app.use(cookieParser());
app.use(express.json()); 

app.use(router); 




const port = 5000;
app.listen(port,()=>{
    console.log('server is listening on port' + port)
})