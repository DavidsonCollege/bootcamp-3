const router = require("express").Router();
const Todo = require("mongoose").model("Todo");
const User = require("mongoose").model("User");

//
// router.use((req, res, next) => {
//   const guidVal = req.headers.key;
//   if (guidVal === undefined){
//     res.sendStatus(403);
//   }
//   User.find({guid: guidVal}, (err, resq)=> {
//     if (resq.length === 0){
//       res.sendStatus(403);
//     }
//     else{
//       next();
//     }
//   }
//  )
// });

router.post("/add/", (req, res) => {
  //const guidVal = req.headers.key;
 const obj = new Todo ({description : req.body.description,
  completedOn: Date.now(), createdOn: Date.now()});
obj.save().then(() => (res.render("todo", {err: null, res: "Todo Created! ;)"})))});

router.delete("/delete/", (req, res) => {
  //const guidVal = req.headers.key;
  Todo.findByIdAndDelete(req.body.id ,
    (err, todos) => (res.render("todo", {err: err,res: "Todo Deleted"})))});


router.post("/:description", (req, res) => {
  //const guidVal = req.headers.key;
 const obj = new Todo ({description : req.params.description,
  completedOn: Date.now(), createdOn: Date.now()});
obj.save().then(() => (res.render("todo", {err: null, res: "Todo Created! ;)"})))});

//get all
router.get("/", (req, res) => {
  // Todo.find({}, (err, todos) => (res.render('todo', {req,err,todos})))});
  Todo.find({},(err,todos) => {
    (res.render("todo", {err: err,res: todos}))})
})

  //get all completed todos
router.get("/completed", (req, res) => {
  Todo.find({completedOn: {$ne: null}}, (err, todos) =>
  (res.render("todo", {err: err,res: todos})))});

    //get all uncompleted todos
    //query.find
  router.get("/notCompleted", (req, res) => {
    Todo.find({completedOn: null}, (err, todos) =>
    (res.render("todo", {err: err,res: todos})))});

//get one todo by id
router.get("/:id/", (req, res) => {
  Todo.findById(req.params.id , (err, todos) =>
  (res.render("todo", {err: err,res: todos})))});


//delete a todo by id
router.delete("/:id/", (req, res) => {
  Todo.findByIdAndDelete(req.params.id ,
    (err, todos) => (res.render("todo", {err: err,res: "Todo Deleted"})))});

//mark a todo as complete by id
router.put("/:id/", (req, res) => {
  //const guidVal = req.headers.key;
  Todo.findByIdAndUpdate(req.params.id, {completedOn: Date.now()} ,
  (err, todos) => (res.render("todo", {err: err,res: "Todo updated!"})))});

//update the text of a todo by id
router.put("/:id/:description", (req, res) => {
  //const guidVal = req.headers.key;
  Todo.findByIdAndUpdate(req.params.id, {description: req.params.description }
     , (err, todos) =>
    (res.render("todo", {err: err,res: "Todo updated! ;o"})))});

module.exports = router;
