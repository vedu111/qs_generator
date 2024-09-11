const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/collections', async (req, res) => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();

        const collectionNames = collections.map(collection => collection.name);
        res.status(200).json({
            collections: collectionNames
        });
    } catch (error) {
        console.error('Error fetching collections:', error);
        res.status(500).json({
            message: 'Error fetching collections',
            error: error.message
        });
    }
});

module.exports = router;
