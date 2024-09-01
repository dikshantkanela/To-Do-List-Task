const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Models : 
const TodoModel = require("./Models/Todo")
//Open the server : 


app.post('/add',(req,res)=>{
   const task = req.body.task  //to access the added task sent from frontend
   TodoModel.create({task:task}) //task is received from frontend
   .then((result)=>{
    res.json(result)
   })
   .catch((err)=>{
    res.json(err);
   })
})

app.get('/get',(req,res)=>{
    TodoModel.find()
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        res.json(err);
    })
})

app.put('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    TodoModel.findByIdAndUpdate(id, { task: task }, { new: true }) // Update the task
        .then(result => res.json(result))
        .catch(err => res.json(err));
});


app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete(id)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        });
});

app.listen(3000,()=>{
    console.log("Server is live!")
})
