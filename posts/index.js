const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    if (!title) {
        res.status(400).json({
            status: 'fail',
            message:'Post must have a title',
        })
    }
    posts[id]={
        id, title
    };

    res.status(201).json({
        status: 'success',
        data: {
            data: posts[id]
        }
    })
});

app.listen(4000, () => {
    console.log('Listening on 4000');
});