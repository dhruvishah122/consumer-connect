const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3003;

// Middleware
app.use(cors());
app.use(express.json());

// Mongoose model
const notificationSchema = new mongoose.Schema({
  title: String,
  message: String,
  time: String,
  status: { type: String, default: "pending" },
  read: { type: Boolean, default: false },
});
const Notification = mongoose.model("Notification", notificationSchema);

// Routes
app.get("/api/notifications", async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

app.post("/api/notifications", async (req, res) => {
  try {
    const { title, message, time } = req.body;
    const newNotification = new Notification({ title, message, time });
    await newNotification.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to create notification" });
  }
});

app.patch("/api/notifications/:id/accept", async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { status: "accepted", read: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to update notification" });
  }
});

app.patch("/api/notifications/:id/reject", async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { status: "rejected", read: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to update notification" });
  }
});

// Connect to MongoDB
mongoose.connect("mongodb+srv://maahivaghela05:Ma82810La@consumer-connect.bvrrf.mongodb.net/Notifications/branchNotifications", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
