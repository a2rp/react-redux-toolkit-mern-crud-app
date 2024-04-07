require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const { connectDB } = require("./src/utils/db.connect");
const PORT = process.env.PORT || 3000;
const itemRoutes = require("./src/routes/item.routes");

app.use(express.json());
app.use(cors());

connectDB();

app.get("/api", (req, res) => {
    res.status(200).send({ response: "api worked..." });
});
app.use("/api", itemRoutes);

app.listen(PORT, console.log(`server running  http://localhost:${PORT}`));

