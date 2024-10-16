
import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.get("/", (req, res) => {
    res.send("From the app");
});

mongoose.connect("mongodb://localhost:27017/")
    .then(() => {
        console.log("Connection succesful");
        app.listen(3000, () => {
            console.log("Listening to port 3000")
        });
    }).catch((error) => {
        console.log("Failed to connect ", error);
    });