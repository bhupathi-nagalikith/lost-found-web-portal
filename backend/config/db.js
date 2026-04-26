const mongoose = require("mongoose");

const CONNECTION_OPTIONS = {
  serverSelectionTimeoutMS: 15000,
  connectTimeoutMS: 15000,
  family: 4,
};

const connectDB = async () => {
  const primaryUri = process.env.MONGO_URI;
  const fallbackUri = process.env.MONGO_DIRECT_URI;

  try {
    console.log("Attempting connection to MongoDB Atlas...");
    await mongoose.connect(primaryUri, CONNECTION_OPTIONS);
    console.log("MongoDB Connected");
  } catch (error) {
    const isSrvDnsFailure =
      primaryUri?.startsWith("mongodb+srv://") &&
      fallbackUri &&
      /querySrv|ENOTFOUND|ECONNREFUSED/i.test(error.message);

    if (isSrvDnsFailure) {
      console.warn("Primary SRV URI failed. Retrying with direct Atlas node URI...");

      try {
        await mongoose.connect(fallbackUri, CONNECTION_OPTIONS);
        console.log("MongoDB Connected");
        return;
      } catch (fallbackError) {
        console.error("MongoDB direct connection also failed:");
        console.error(fallbackError.message);
      }
    }

    console.error("MongoDB Connection Error:");
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
