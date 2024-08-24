import mongoose from "mongoose";

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const createConnection = async (uri) => {
  const connectWithRetry = async () => {
    try {
      // Attempt to connect to MongoDB
      await mongoose.connect(uri, clientOptions);
      // Ping to ensure connection is established
      await mongoose.connection.db.admin().command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error.message);
      console.log("Retrying connection in 5 seconds...");
      // Retry connection after a delay
      setTimeout(connectWithRetry, 5000);
    }
  };

  // Initial connection attempt
  connectWithRetry();
};

export default createConnection;
