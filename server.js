const express = require("express");
const morgan = require("morgan");
const mongoose = require('mongoose');
const basicAuth = require('express-basic-auth')

const url = 'mongodb://localhost/todoApp';


const app = express();

app.use(morgan("tiny"));

app.use(basicAuth({
    users: {
        'admin': 'admin'
    }
}));

mongoose.connect(url);

let TodoSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            maxlength: 100
        },
        completedOn: {
            type: Date
        },
        createdOn: {
            type: Date
        }
    }
);

let todo = mongoose.model('todo', TodoSchema);

app.get("/", (req, res) => {
    res.send({message: "I'm alive!"});
});

// Get all todos
app.get("/todo/all", (req, res) => {
    todo.find({}, (err, todos) => {
        res.send(todos);
    });
});

// Get todo by ID
app.get("/todo", (req, res) => {
    const id = req.query.id;
    todo.findById(id, (err, todo) => {
        res.send(todo);
    })
});

// Get all completed todos
app.get("/todo/completed", (req, res) => {
    todo.find({completedOn: {$ne: null}}, (err, todos) => {
        res.send(todos);
    });
});

// Get all uncompleted todos
app.get("/todo/uncompleted", (req, res) => {
    todo.find({completedOn: null}, (err, todos) => {
        res.send(todos);
    });
});

// Add a new todo
app.post("/todo/add", (req, res) => {
    const newTodo = new todo({
        description: req.query.description,
        completedOn: null,
        createdOn: Date.now()
    });
    newTodo.save().then(() => {
        res.send({status: "success"})
    })
});

// Delete a todo by id
app.delete("/todo/delete", (req, res) => {
    const id = req.query.id;
    todo.findByIdAndDelete(id, (err, todo) => {
        res.send(todo);
    })
});

// Mark todo as completed
app.put("/todo/mark-completed", (req, res) => {
    const id = req.query.id;
    todo.findByIdAndUpdate(id, {$set: {completedOn: Date.now()}}, (err, todo) => {
        res.send({status: "success"});
    })
});

// Update text by id
app.put("/todo/update-text", (req, res) => {
    const id = req.query.id;
    const d = req.query.description;
    todo.findByIdAndUpdate(id, {$set: {description: d}}, (err, todo) => {
        res.send({status: "success"});
    })
});

// Listen to port 8080
app.listen("8080");
