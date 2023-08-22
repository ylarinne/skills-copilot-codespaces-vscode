// Create web server
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');

// Read comments.json file
const comments = require('./comments.json');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Get comment by id
app.get('/comments/:id', (req, res) => {
    const id = Number(req.params.id);
    const comment = comments.find(comment => comment.id === id);
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).json({ error: 'Comment not found' });
    }
});

// Create new comment
app.post('/comments', (req, res) => {
    const comment = req.body;
    comment.id = comments.length + 1;
    comments.push(comment);
    res.json(comment);
});

// Update comment by id
app.put('/comments/:id', (req, res) => {
    const id = Number(req.params.id);
    const comment = comments.find(comment => comment.id === id);
    if (comment) {
        Object.assign(comment, req.body);
        res.json(comment);
    } else {
        res.status(404).json({ error: 'Comment not found' });
    }
});

// Delete comment by id
app.delete('/comments/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = comments.findIndex(comment => comment.id === id);
    if (index !== -1) {
        comments.splice(index, 1);
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Comment not found' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});