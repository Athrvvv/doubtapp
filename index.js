const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());



const url = "mongodb+srv://atharvapkhond:catsFORlife@doubt-app.in05vg0.mongodb.net/?retryWrites=true&w=majority&appName=Doubt-App"; // Local MongoDB URL, change to your MongoDB Atlas URL if using MongoDB Atlas
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect()
  .then(() => {
    console.log("Connected to MongoDB");

    const db = client.db("doubtapp");
    const coll = db.collection("client");

    app.post("/save", (req, res) => {
      const record = {
        name: req.body.name,
        phone: req.body.phone,
        doubt: req.body.doubt,
      };
      coll.insertOne(record)
        .then(result => res.send(result))
        .catch(error => res.send(error));
    });

    app.listen(9000, () => {
      console.log("Server ready @9000");
    });
  })
  .catch(err => console.error("Failed to connect to MongoDB", err));
