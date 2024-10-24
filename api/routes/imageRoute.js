// routes/imageRoute.jsx
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const UNSPLASH_API_URL = 'https://api.unsplash.com/photos/random';
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

// Route to get random space images
router.get('/random-space-images', async (req, res) => {
    const count = req.query.count ? parseInt(req.query.count) : 1; // Ensure count is a number
    try {
        const response = await axios.get(UNSPLASH_API_URL, {
            params: {
                query: 'space',
                count: count, // Use the count parameter from the query
            },
            headers: {
                Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
            },
        });

        const images = response.data.map(image => ({
            imageUrl: image.urls.regular,
            altDescription: image.alt_description,
        }));

        res.json(images); // Return the array of images
    } catch (error) {
        console.error('Error fetching images from Unsplash:', error.message);
        res.status(500).json({ error: 'Failed to fetch images' }); // Send error response
    }
});

export default router;
