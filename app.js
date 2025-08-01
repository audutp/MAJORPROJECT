const express = require("express");
const app = express();
const mongoose =require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const res = require("express/lib/response.js");
require('dotenv').config({ path: './.env' });
console.log("Loaded ENV Variables:", process.env.KEY);
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => { console.log("connected successful to DB") }).catch(err => { console.log(err); })
async function main() {
    console.log("Connecting to MongoDB Atlas");
    // await mongoose.connect(process.env.Database_url_atlas)
    await mongoose.connect(process.env.Database_url_atlas) 
    console.log("Connected to MongoDB Atlas");
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// app.use("/api", (req,res,next)=>{
//     let {token}= req.query;
//     if (token === "giveaccess"){
//         next();
//     }
//     res.send("ACCESS DENIED!");
// });

// app.get("/api", checkToken, (req,res) =>{
//     res.send("data");
// })

app.get("/",(req,res) => {
    res.status(404).send("Hi,I am root");
});

//Index Route---------------------------------------------------------------------------------------
app.get("/listings", async (req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
});

//New Route
app.get("/listings/new", (req,res) => {
    res.render("listings/new.ejs");
});


//Show Route
app.get("/listings/:id", async(req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
   
});

//Create Route
app.post("/listings", async (req,res) => {
    const newListing = new Listing( req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

//Edit Route
app.get("/listings/:id/edit", async (req,res) =>{
    let { id } =req.params;
    const listing =await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

//Update Route
app.put("/listings/:id", async (req,res) => {
    let { id } =req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect (`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id", async (req,res) => {
    let { id } =req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");

});


// app.get("/testListing", async (req,res) =>{
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "calangute,Goa",
//         country:"India"
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });

app.listen(8080, () => {
    console.log("server is listining to 8080");
});
