
const { Kafka } = require('kafkajs');
const { MongoClient, ObjectId } = require('mongodb');
const { Server } = require("socket.io");

// MongoDB connection
const MONGO_URI = "mongodb+srv://maahivaghela05:Ma82810La@consumer-connect.bvrrf.mongodb.net";  // Update if needed
const DB_NAME = "PostService";                 // Replace with your DB name
const COLLECTION_NAME = "posts";                // Replace with your collection name

const kafka = new Kafka({
  clientId: 'post-notifier',
  brokers: ['localhost:9092'],
});

// const consumer = kafka.consumer({ groupId: 'notifications' });

// const io = new Server(3001, { cors: { origin: "*" } }); // WebSocket server for real-time notifications

// const runConsumer = async () => {
//   await consumer.connect();
//   await consumer.subscribe({ topic: 'post-notifications', fromBeginning: true });

//   // Connect to MongoDB
//   const client = new MongoClient(MONGO_URI);
//   await client.connect();
//   const db = client.db(DB_NAME);
//   const postsCollection = db.collection(COLLECTION_NAME);

//   await consumer.run({
//     eachMessage: async ({ message }) => {
//       try {
//         const postID = message.value.toString();
//         console.log(`Received postID: ${postID}`);

//         // Fetch post details from MongoDB
//         const post = await postsCollection.findOne({ _id: new ObjectId(postID) });

//         if (!post) {
//           console.error(`Post with ID ${postID} not found.`);
//           return;
//         }

//         // Create notification object
//         const notification = {
//           title: post.title || "New Post",
//           message: post.description ? post.description.substring(0, 50) + "..." : "Click to view",
//           author: post.authorName || "Unknown",
//           postId: postID
//         };

//         console.log("Sending notification:", notification);

//         // Emit notification to frontend via WebSocket
//         io.emit("new-notification", notification);

//       } catch (error) {
//         console.error("Error processing message:", error);
//       }
//     },
//   });
// };

// runConsumer().catch(console.error);

const consumer = kafka.consumer({ groupId: "notifications" });

const io = new Server(3002, { cors: { origin: "*" } }); // WebSocket server for real-time notifications
const io1 = new Server(3001, { cors: { origin: "*" } }); // WebSocket server for real-time notifications
const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "post-notifications", fromBeginning: true });

  // Connect to MongoDB
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db(DB_NAME);
  const postsCollection = db.collection(COLLECTION_NAME);
  const userDb=client.db("Authentication").collection("csignups");
  const branchNotiDb =client.db("Notifications").collection("branchNotifications");
  const customerNotiDb =client.db("Notifications").collection("customerNotifications");
  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const postID = message.value.toString();
        console.log(`Received postID: ${postID}`);

        // Fetch post details from MongoDB
        const post = await postsCollection.findOne({ _id: new ObjectId(postID) });
        
        if (!post) {
          console.error(`Post with ID ${postID} not found.`);
          return;
        }
        const user1= await userDb.findOne({email:post.customerEmail});
        // Create notification object
        console.log(post.customerEmail); console.log(user1);
        const notification = {
          id: postID,
          title: user1.name || "customer",
          message: post.postText ? post.postText.substring(0, 50) + "..." : "new complaint registered",
          time: new Date().toLocaleTimeString(),
          phone: user1.phone,
          status: "pending",
          read: false
        };
       await branchNotiDb.insertOne(notification);
        const customerNotification={
          id:postID,
          title:'Complaint opened!',
          message:'Your complaint is being processed by Dmart',
          time: new Date().toLocaleTimeString(),
          status: "pending",
          read: false
        }
        await customerNotiDb.insertOne(customerNotification);
        console.log("Sending notification:", notification);

        // Emit notification to frontend via WebSocket
        io.emit("new-notification", notification);
        io1.emit("new-notification", customerNotification);

      } catch (error) {
        console.error("Error processing message:", error);
      }
    },
  });
};

runConsumer().catch(console.error);