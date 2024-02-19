const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
   const comments = commentsByPostId[req.params.id] || []   ;
   
   res.status(201).send(comments);
});

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];
    
    comments.push({id: commentId, content});

    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments);
})

app.listen(4001, () => {
    console.log('Listening on port 4001');
})