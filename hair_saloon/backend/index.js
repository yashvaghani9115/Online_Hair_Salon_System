import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import customerRoute from './routes/customerRoute.js';
import ownerRoute from './routes/ownerRoute.js';

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())


app.use("/customer",customerRoute);
app.use("/owner",ownerRoute);


mongoose.connect('mongodb://localhost/hairSaloonDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.warn("Data Base Connected....")
});

app.listen(9700, () => {
    console.log("Server Started...")
});