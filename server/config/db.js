const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDb connected");
};

module.exports = connectDB;
