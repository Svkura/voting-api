const express = require('express');
const mongoose = require('mongoose');
const pollRoutes = require('./routes/pollRoutes');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/polls', pollRoutes);

mongoose.connect('mongodb://localhost:27017/votingDB')
    .then(() => {
        console.log('MongoDB connected!');
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
    })
    .catch(err => console.error('MongoDB connection error:', err));