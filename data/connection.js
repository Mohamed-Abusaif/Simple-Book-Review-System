import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import exp from "constants";
dotenv.config();
// Replace the placeholder with your Atlas connection string
const uri = process.env.DB_STRING.replace(
  "<db_password>",
  process.env.DB_PASSWORD
);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    if (!client.topology || !client.topology.isConnected()) {
      await client.connect();
      console.log("✅ Connected to MongoDB!");
    }
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); // Stop the server if MongoDB connection fails
  }
}

export { client, connectDB };
