const express = require("express");
const urlRouter = require('./routes/url');
const connectToMongoDb = require('./connection');

const app = express();

connectToMongoDb('mongodb://localhost:27017/short-url').then(()=>{
    console.log('MongoDb Connected');
}).catch((err)=>{
    console.log(`Something gets wrong Error: ${err}`);
});

const PORT = 8001;

app.use(express.json());

app.use("/url",urlRouter);

app.listen(PORT, ()=>{
    console.log(`Server is Started on PORT: ${PORT}`);
})