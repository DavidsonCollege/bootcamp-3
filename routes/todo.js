const router = require("express").Router();
const Todo = require("mongoose").model("Todo");


router.post("/:description", (req, res) => {
const obj = new Todo ({description : req.params.description,
  completedOn: Date.now(), createdOn: Date.now() });
obj.save().then(() => (res.send("Todo created")))});

//get all
router.get("/", (req, res) => {
  Todo.find({}, (err, todos) => (res.send(todos)))});

  //get all completed todos
router.get("/completed", (req, res) => {
  Todo.find({completedOn: {$ne: null}}, (err, todos) => (res.send(todos)))});

    //get all uncompleted todos
    //query.find
  router.get("/notCompleted", (req, res) => {
    Todo.find({completedOn: null}, (err, todos) => (res.send(todos)))});

//get one todo by id
router.get("/:id/", (req, res) => {
  Todo.findById(req.params.id , (err, todos) => (res.send(todos)))});


//delete a todo by id
router.delete("/:id/", (req, res) => {
  Todo.findByIdAndDelete(req.params.id ,
    (err, todos) => (res.send("Object deleted.")))});

//mark a todo as complete by id
router.put("/:id/", (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, {completedOn: Date.now()} ,
  (err, todos) => (res.send("Object updated.")))});

//update the text of a todo by id
router.put("/:id/:description", (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, {description: req.params.description } ,
    (err, todos) => (res.send("Object updated.")))});

module.exports = router;
