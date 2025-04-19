const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 8084;

// Middleware
app.use(cors());
app.use(express.json());
const { MongoClient, ObjectId } = require('mongodb');

// MongoDB Connection
const MONGO_URI = "mongodb+srv://maahivaghela05:Ma82810La@consumer-connect.bvrrf.mongodb.net/Notifications";
const MONGO_URL="mongodb+srv://maahivaghela05:Ma82810La@consumer-connect.bvrrf.mongodb.net";
  const client = new MongoClient(MONGO_URL);
  const client1 = new MongoClient(MONGO_URL);

  const client2 = new MongoClient(MONGO_URL);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catc

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));


const branchNotificationSchema = new mongoose.Schema({
    id: String,
    privateID: String,
    title: String,
    message: String,
    time: String,
    phone:Number,
    status: String,
    read: Boolean,
  });
  
  const BranchNotification = mongoose.model(
    "branchNotifications",
    branchNotificationSchema,
    "branchNotifications" // explicitly point to correct collection
  );
  
  // Route to fetch all notifications
  app.get("/branch/notifications/accept/:id",async(req,res)=>{
    const updated = await BranchNotification.findOneAndUpdate(
        { id: req.params.id },
        { $set: { status: "accepted" , read: true } },
        { new: true } // returns updated doc
      );
      console.log("updated notification");
      console.log(updated);
     res.json(updated);
  })
  app.get("/branch/notifications/:id", async (req, res) => {
    try {
      const notifications = await BranchNotification.find({privateID:req.params.id}).sort({ time: -1 });
      // console.log(notifications); // recent first
      // console.log(req.params.id);
      res.json(notifications);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  
app.get('/:privateID/status', async (req, res) => {
  const privateID= req.params.privateID;
  console.log(req.params);
  try {
    await client.connect();
    const db = client.db("StatusService");
    const collection = db.collection('Status');

    const documents = await collection.find({privateID:privateID}).toArray();

    // Format the response for frontend
    const formatted = await Promise.all(
      documents.map(async (doc) => {
        const customer = await client2.db("Authentication").collection("csignups").findOne({ email: doc.email });
        const branch = await client1.db("Authentication").collection("bsignups").findOne({ privateID: doc.privateID });
    
        return {
          customerName: customer?.name || "Unknown",
          branchName: branch?.branch_name || "Unknown",
          productId: doc._id.toString(),
          productDetails: doc.product,
          status: doc.status,
        };
      })
    );
    
console.log("formatted data",formatted);
    res.json(formatted);
  } catch (err) {
    console.error('Error fetching status:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
  