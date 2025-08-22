const express = require("express");
const mongoose = require('mongoose');
const path = require("path"); 
require("dotenv").config();

const cookieParser = require('cookie-parser');
//name change

const URL = require('./models/url');

const { restrictToLoggedinUserOnly , checkAuth , restrictTo , checkForAuthentication } = require('./middleware/auth');

const { connectToMongoDB } = require("./connection");

const app = express();


const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRoute');
const userRoute = require('./routes/user');

mongoose.connect(process.env.MONGO_URL)

  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));


  // async function connectToMongoDb(url){    
    //     return mongoose.connect(url);
    // }
    app.use(express.json());        
    app.use(express.urlencoded({ extended: false}));
    app.use(cookieParser()); 
    app.use(checkForAuthentication);
    
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/test", async (req,res)=>{
    const allUrls = await URL.find({});
    return res.render("home", {  
        urls: allUrls,
        BASE_URL: process.env.BASE_URL
    });
});

app.use('/' , staticRoute);
app.use("/url" , restrictTo(["NORMAL", "ADMIN"]) ,  urlRoute);
app.use('/user', userRoute);

if (require.main === module) {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
} else {
    module.exports = app;
}
