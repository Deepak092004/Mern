
const express = require('express');
const notemodel = require('./models/post.model');
const multer = require('multer');
const uploadFile = require('./services/storage.service');
const postmodel = require('./models/post.model');

const app = express();

app.use(express.json());

const upload = multer({storage: multer.memoryStorage()});



app.post('/create-post', upload.single('image'), async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    const result = await uploadFile(req.file.buffer);
    const post = await postmodel.create({
        image: result,
        caption: req.body.caption,
    });
    res.status(201).json({
        message: 'Post created successfully',
        post,
    });
});

app.get('/posts', async (req, res) => {
    const posts = await postmodel.find();
    res.status(200).json({
        posts,
    });
});

app.get('/posts/:id', async (req, res) => {
    const post = await postmodel.findById(req.params.id);
    if (!post) {
        return res.status(404).json({
            message: 'Post not found',
        });
    }
    res.status(200).json({
        post,   
    });
});

app.delete('/posts/:id', async (req, res) => {
    const post = await postmodel.findByIdAndDelete(req.params.id);
    if (!post) {
        return res.status(404).json({
            message: 'Post not found',
        });
    }
    res.status(200).json({
        message: 'Post deleted successfully',
    });
}); 

module .exports = app;


