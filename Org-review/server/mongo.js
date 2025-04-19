const mongoose = require("mongoose");

const authDB = mongoose.createConnection(
  "mongodb+srv://maahivaghela05:Ma82810La@consumer-connect.bvrrf.mongodb.net/Authentication",
  
);

const branchProfileDB = mongoose.createConnection(
  "mongodb+srv://maahivaghela05:Ma82810La@consumer-connect.bvrrf.mongodb.net/BranchProfile",
  
);

module.exports = {
  authDB,
  branchProfileDB,
};
