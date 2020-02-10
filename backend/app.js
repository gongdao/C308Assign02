const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const commentsRoutes = require("./routes/commentsRt");

const Comment = require('./models/comment');

const app = express();

mongoose
  .connect(
    "mongodb://localhost/assignment02", { useNewUrlParser: true, useUnifiedTopology: true }
  ) // works

//mongoose.connect("mongodb+srv://buzhaobin:tzA9y-u67zbfURN@buildingm-dzacs.mongodb.net/test?retryWrites=true", { useNewUrlParser: true })
//mongoose.connect("mongodb://buzhaobin:tzA9y-u67zbfURN@buildingm-shard-00-00-dzacs.mongodb.net:27017,buildingm-shard-00-01-dzacs.mongodb.net:27017,buildingm-shard-00-02-dzacs.mongodb.net:27017/test?ssl=true&replicaSet=BuildingM-shard-0&authSource=admin&retryWrites=true", { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to mongodb.');
  }).catch(() => {
    console.log('Connection failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// app.post("/api/comments", (req, res, next) => {
//     const comment = new Comment({
//         courseCode: req.body.courseCode,
//         courseName: req.body.courseName,
//         program: req.body.program,
//         semester: req.body.semester,
//         content: req.body.content
//     });
//     comment.save().then(createdComment => {
//       console.log(createdComment);
//       res.status(201).json({
//           message: 'Comment added successfully!',
//           commentId: createdComment._id
//       });
//     });
// });

// app.put("/api/comments/:id", (req, res, next) => {
//   const comment = new Comment({
//     _id: req.body.id,
//     courseCode: req.body.courseCode,
//     courseName: req.body.courseName,
//     program: req.body.program,
//     semester: req.body.semester,
//     content: req.body.connect
//   });
//   Comment.updateOne({_id: req.params.id}, comment).then(result => {
//     console.log(result);
//     res.status(200).json({message: "update successfully."});
//   })
// })

// app.get('/api/comments', (req, res, next) => {
//     Comment.find().then(documents => {
//         console.log(documents);
//         res.status(200).json({
//             message: 'Commets fetched successfully!',
//             comments: documents
//         });
//     });
// });
// app.get("/api/comments/:id", (req, res, next) => {
//   Comment.findById(req.params.id).then(comment => {
//     if(comment) {
//       res.status(200).json(comment);
//     }else{
//       res.status(404).json({message: 'Comment not found!'});
//     }
//   });
// });

// app.delete("/api/comments/:id", (req, res, next) => {
//   Comment.deleteOne({ _id: req.params.id }).then(result => {
//     console.log(result);
//     res.status(200).json({ message: "Comment deleted!"});
//   });
// });
app.use("/api/comments", commentsRoutes);
module.exports = app;