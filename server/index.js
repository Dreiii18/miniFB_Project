const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const accountsRouter = require('./routes/accounts');
const postsRouter = require('./routes/posts');
const contactsRouter = require('./routes/contacts');
const path = require('path');
const jikanjs = require('@mateoaranda/jikanjs');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3500;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running');
});

// Accounts route
app.use('/accounts', accountsRouter);

// Posts route
app.use('/posts', postsRouter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Contacts route
app.use('/contacts', contactsRouter);

// Jikan Anime API
app.get('/anime/synopsis', async (req, res) => {
    const animeTitle = req.query.title; // Get the title from query parameters

    if (!animeTitle) {
        return res.status(400).json({ error: 'Anime title is required.' });
    }

    try {
        // Search for the anime
        const searchResults = await jikanjs.search('anime', animeTitle, 1);

        if (searchResults && searchResults.data && searchResults.data.length > 0) {
            const synopsis = searchResults.data[0].synopsis;
            return res.json({ title: animeTitle, synopsis });
        } else {
            return res.status(404).json({ error: `No anime found with the title "${animeTitle}".` });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});

// Connect to MongoDB
mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.error('MongoDB connection error:', error));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});