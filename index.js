const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("raj-cart server is running");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fe8xrlp.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const categoryCollection = client.db("raj-cart").collection("categories");
    const productCollection = client.db("raj-cart").collection("products");

    //category api
    app.get("/category", async (req, res) => {
      const query = {};
      const categories = await categoryCollection.find().toArray();
      res.send(categories);
    });

    //getting product by category id api

    app.get("/product-category-wise/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { categoryId: id };
      const products = await productCollection.find(filter).toArray();
      res.send(products);
    });

    //getting all product api
    app.get("/product", async (req, res) => {
      const products = await productCollection.find().toArray();
      res.send(products);
    });

    //getting a single product api
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const product = await productCollection.findOne(filter);
      res.send(product);
    });
  } finally {
  }
}
run().catch(console.log);

app.listen(port, () => {
  console.log("raj-cart server is running on port", port);
});
