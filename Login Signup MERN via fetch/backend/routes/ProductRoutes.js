const express = require('express');
const router = express.Router();

// Imports
const ensureAuthenticated = require('../middleware/Auth');


router.get('/', ensureAuthenticated, async (req, res) => {
    res.status(200).json([
        {
            name: "Harsh",
            gender: "Male"
        },
        {
            name: "Khushi",
            gender: "Female"
        },
    ])
})



module.exports = router;