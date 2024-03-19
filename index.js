const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors')
const CrimeRecord = require('./CrimeRecord.js'); // The model file

const app = express();
const port = 3000;
app.use(cors());
mongoose.connect('mongodb+srv://shardeum786:IdcsxQjM8z35VLLQ@cluster0.5ucbaht.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

// Route to insert data (You can call this after parsing your CSV to JSON)
app.post('/post', async (req, res) => {
    try {
        await CrimeRecord.insertMany(req.body);
        res.send('Data inserted successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/',(req,res)=>{
    res.send("hello I am up")
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});