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

app.get('/fetch-data', async (req, res) => {
    try {
      const url = 'https://ef6c-34-136-255-126.ngrok-free.app/data';
      
      // Add headers to bypass ngrok's warning page
      const config = {
        headers: {
          'ngrok-skip-browser-warning': 'anyvalue', // You can set this header to any value
          'User-Agent': 'MyCustomUserAgent' // Alternatively, set a custom User-Agent
        }
      };
      
      // Use axios to send a GET request to the URL with additional headers
      const response = await axios.get(url, config);
      
      // Send the response data back to the client
      res.send(response.data);
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch data' });
    }
  });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});