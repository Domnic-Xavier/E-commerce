const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

app.use(express.json()); //with the help of express json whatever we get response will automatically pass to JSON
app.use(cors()); //using these our react project will connect to express app on 4000 port


//Database Coonection with Mongodb it is .env file
mongoose.connect("mongodb+srv://rachanareddy513:1234@cluster0.xuoawst.mongodb.net/e-commerce")

 //API Creation

app.get("/",(req,res)=>{
     res.send("Express App is Running")
 })

//Image Storage Engine
const storage = multer.diskStorage({
    destination : "./upload/images",
     filename : (req,file,cb)=>{
          return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
     }
 })

 const upload = multer({storage : storage})

//creating upload endpoint for images by these we can upload the endpoint and check in thunderclient by using post
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
         success:1,
         image_Url:`http://localhost:${port}/images/${req.file.filename}`
     })
 })

 //Schema for Creating products
 
 const Product = mongoose.model('Product',{
    id:{
        type :Number,
        required:true,
    },
    name:{
        type :String,
        required:true,
    },
    image:{
        type :String,
        required:true,
    },
    category:{
        type :String,
        required:true,
    },
    new_price:{
        type :Number,
        required:true,
    },

    old_price:{
        type :Number,
        required:true,
    },
    date:{
        type :Date,
        default:Date.now,
    },
    available:{
        type :Boolean,
        default:true,
    },
 })

 //we use these schema to add the product in our data base we creating one endpoint
 //also called controllers it contains logic for handling
 app.post('/addproduct',async (req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length > 0)
    {
       let last_product_array = products.slice(-1);
       let last_product= last_product_array[0];
       id = last_product.id + 1;
    }
    else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name:req.body.name,
    })
})

//creating the API for removing or deleting the product

app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success : true,
        name : req.body.name
    })
})

//Creating a API for getting all products
app.get('/allproducts',async(req,res)=>{
    let products = await Product.find({});
   console.log("All products Fetched");
   res.send(products);
})

//this starts the server = server.js
app.listen(port,(error)=>{
    if (!error) {
        console.log("server Running on port" + port);
    }

    else{
        console.log("Error : " + error);
    }
})