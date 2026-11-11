require("dotenv").config();

const cors = require("cors");
const express = require("express");
const { connectDB } = require("./src/utils/db.connect");
const itemRoutes = require("./src/routes/item.routes");

const app = express();
const PORT = Number(process.env.PORT) || 1198;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json({ limit: "10kb" }));

app.get("/api", (req, res) => {
  res.status(200).json({ response: "API is ready." });
});
app.use("/api", itemRoutes);

app.use((error, req, res, next) => {
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ response: "Request body must contain valid JSON." });
  }
  if (error.type === "entity.too.large") {
    return res.status(413).json({ response: "Request body is too large." });
  }

  console.error(error);
  return res.status(500).json({ response: "An unexpected server error occurred." });
});

async function startServer() {
  try {
    const connection = await connectDB();
    console.log(`MongoDB connected: ${connection.connection.host}`);
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`Unable to connect to MongoDB: ${error.message}`);
    process.exit(1);
  }
}

startServer();