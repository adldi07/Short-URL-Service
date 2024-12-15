const express = require("express");
const urlRoute = require('./routes/url');
const mongoose = require('mongoose');

const { connectToMongoDB } = require("./connection");

const app = express();

// mongoose.connect("mongodb://localhost:27017/short-url").then(()=>{
//     console.log('MongoDB Connected');
// });
mongoose.set('debug', true);


// connectToMongoDB("mongodb://localhost:27017/short-url").then(()=>{
//     console.log('Mongodb connected'); 
// })  
// .catch((err)=>{
//     console.log('Error detected');
//     console.log(err);
// });

// const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/short-url', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));


// async function connectToMongoDb(url){    
//     return mongoose.connect(url);
// }
app.use(express.urlencoded({ extended: false}));

const PORT = 8001;

app.use(express.json());

app.use("/url",urlRoute);

app.listen(PORT, ()=>{
    console.log(`Server is Started on PORT: ${PORT}`);
})