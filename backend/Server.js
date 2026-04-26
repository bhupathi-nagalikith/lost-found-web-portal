const dns = require("node:dns");
dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/Authroutes"));
app.use("/api", require("./routes/ReportRoutes"));
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend Connected Successfully!" });
});

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
