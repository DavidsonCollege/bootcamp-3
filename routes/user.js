const router = require("express").Router();
const User = require("mongoose").model("User");
const uuid = require("uuid/v1");


router.post("/:username/:password/:email", (req, res) => {
  const guidVal = uuid();
  const obj = new User ({ userName: req.params.username,
  password: req.params.password, email: req.params.email, guid: guidVal});
  obj.save().then( () => (res.send(guidVal)))});

// //get all
// router.get("/", (req, res) => {
//   Todo.find({}, (err, todos) => (res.send(todos)))});
//
//   //get all completed todoss
// router.get("/completed", (req, res) => {
//   Todo.find({completedOn: {$ne: null}}, (err, todos) => (res.send(todos)))});
//
//     //get all uncompleted todos
//     //query.find
//   router.get("/notCompleted", (req, res) => {
//     Todo.find({completedOn: null}, (err, todos) => (res.send(todos)))});
//
// //get one todo by id
// router.get("/:id/", (req, res) => {
//   Todo.findById(req.params.id , (err, todos) => (res.send(todos)))});
//
//
// //delete a todo by id
// router.delete("/:id/", (req, res) => {
//   Todo.findByIdAndDelete(req.params.id ,
//     (err, todos) => (res.send("Object deleted.")))});
//
// //mark a todo as complete by id
// router.put("/:id/", (req, res) => {
//   Todo.findByIdAndUpdate(req.params.id, {completedOn: Date.now()} ,
//   (err, todos) => (res.send("Object updated.")))});
//
// //update the text of a todo by id
// router.put("/:id/:description", (req, res) => {
//   Todo.findByIdAndUpdate(req.params.id, {description: req.params.description } ,
//     (err, todos) => (res.send("Object updated.")))});

module.exports = router;
