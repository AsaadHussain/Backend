
import express, { json } from 'express';
import mongoose from 'mongoose';
import { Product } from './models/model.js';

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("From the Backend");
});

app.post("/api/product", async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json({
            message: "Product saved",
            product
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/api/product/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (product) {
            const updatedProduct = await Product.findByIdAndUpdate(id,req.body, {new:true});
            res.status(200).json(
                {
                    message: "Product updated",
                    updatedProduct
                }
            );

        } else {
            res.status(404).json({ message: "Product Not found " })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete("/api/remove/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: "Product Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
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