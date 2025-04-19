
const express = require("express");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const User = require("../models/branchSign.js");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
    res.json({ message: "Branchsignup API is working!" });
});

router.post("/", upload.single("idProof"), async (req, res) => {
    try {
        const { branch_name, email, password, location, phone, privateID } = req.body;
        
      
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let user = await User.findOne({ branch_name });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        user = new User({ 
            branch_name, 
            email, 
            password: hashedPassword, 
            location, 
            phone, 
            privateID,
            idProof: req.file ? { 
                data: req.file.buffer, 
                contentType: req.file.mimetype 
            } : null 
        });
        console.log(user);
        await user.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;





