const express = require("express");
const port = 8086;
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { authDB, branchProfileDB,} = require('./mongo')
const path = require('path');



app.use(express.json()); 
const monthana = require('./routes/monthana');
const orgList = require('./routes/orgList');
const review = require("./routes/reviewForm");
const orgdetails = require('./routes/indiInfo');
const orgreviews = require('./routes/indiReview');
const avgRatingAnalysis = require('./routes/ratingperWeek');
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "CompanyProfile"]
}));

authDB.on('connected', ()=>{
    console.log("connected 1");
})

branchProfileDB.on('connected', ()=>{
    console.log("connected 2");
})

app.use('/', orgList);
app.use('/avgRatingAnalysis', avgRatingAnalysis);
app.use('/complainAnalysis', monthana);
app.use('/company', orgdetails);
app.use('/review', orgreviews);
app.use('/write-review', review);


app.listen(port, ()=>{
    console.log(`listing on ${port}`);
})