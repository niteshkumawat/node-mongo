const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');


const app = express();

app.get('/',(req, res)=>{
    res.send('hello world');
})


mongoose.connect(process.env.DB_CONNECTION, 
    { useUnifiedTopology: true, useNewUrlParser: true }, ()=>{
        console.log('connected to mongoose');
    });

app.listen(process.env.PORT,()=>{
    console.log('server is up and running');
})