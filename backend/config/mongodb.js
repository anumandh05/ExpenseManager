const mongoose = require('mongoose');

const mongoConnection = async () => {
  try {
    const { MONGO_DB_USERNAME, MONGO_DB_PASSWORD, MONGO_DB_ENDPOINT, DATABASE_NAME } = process.env;

    const uri = `mongodb+srv://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@${MONGO_DB_ENDPOINT}/${DATABASE_NAME}?retryWrites=true&w=majority`;
    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
};

module.exports = mongoConnection;
