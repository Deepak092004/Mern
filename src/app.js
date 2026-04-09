
const express = require('express');
const notemodel = require('./models/note.model');


const app = express();

app.use(express.json());

app.post('/notes', async (req, res) => {
    const data = req.body;
    await notemodel.create({
      title: data.title,
      description: data.description
    })

    res.status(201).json({
        message: 'Note created successfully'
    });

   
});

app.get('/getnotes', async(req, res) =>{
    await notemodel.find().then((data) => {
        res.status(200).json({
            message: 'Notes retrieved successfully',
            data: data
        });
    }).catch((err) => {
        res.status(500).json({
            message: 'Error retrieving notes',
            error: err
        });
    }
    );
    });

    app.delete('/deletenote/:id', async(req, res) => {
      const id = req.params.id;

      await notemodel.findByIdAndDelete(id).then(() => {
        res.status(200).json({
            message: 'Note deleted successfully'
        });
      }).catch((err) => {
        res.status(500).json({
          message: 'Error deleting note',
          error: err
        });
      });

    });

    app.patch('/updatenote/:id', async(req, res) => {
      const id = req.params.id;
      const data = req.body;
      await notemodel.findByIdAndUpdate(id, {
        title: data.title,
        description: data.description
      }).then(() => {
        res.status(200).json({
            message: 'Note updated successfully'
        });
      }).catch((err) => {
        res.status(500).json({
          message: 'Error updating note',
          error: err
        });
      });
    });





module .exports = app;


