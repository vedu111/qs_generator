const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.delete('/flush', async (req, res) => {
    try {
        const collections = await mongoose.connection.db.collections();
        for (let collection of collections) {
            await collection.drop();
        }

        res.status(200).json({ message: 'Database has been flushed successfully.' });
    } catch (error) {
        console.error('Error flushing the database:', error);
        res.status(500).json({ message: 'Failed to flush the database.', error });
    }
});

module.exports = router;
