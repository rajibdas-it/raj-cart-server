const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("raj-cart server is running");
});

app.listen(port, () => {
  console.log("raj-cart server is running on port", port);
});
