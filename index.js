const express = require("express");
const mongoose = require('mongoose');
const path = require("path");   
const cookieParser = require('cookie-parser');
//name change

const URL = require('./models/url');

const { restrictToLoggedinUserOnly , checkAuth , restrictTo , checkForAuthentication } = require('./middleware/auth');

const { connectToMongoDB } = require("./connection");

const app = express();


const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRoute');
const userRoute = require('./routes/user');
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

const PORT = 8001;

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
    app.use(express.json());        
    app.use(express.urlencoded({ extended: false}));
    app.use(cookieParser()); 
    app.use(checkForAuthentication);
    
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/test", async (req,res)=>{
    const allUrls = await URL.find({});
    // return res.end(`
    //     <html>
    //         <head></head>
    //         <body>
    //             <ol>
    //                 ${allUrls
    //                     .map((url)=>
    //                     `<li>${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length} </li>`
    //                 ).join("")}
    //             </ol>
    //         </body>
    //     </html>
    // `);
    return res.render("home", {  
        urls: allUrls,
    });
});

app.use('/' , staticRoute);
app.use("/url" , restrictTo(["NORMAL", "ADMIN"]) ,  urlRoute);
app.use('/user',userRoute);
app.listen(PORT, ()=>{
    console.log(`Server is Started on PORT: ${PORT}`);
})