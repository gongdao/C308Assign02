const express = require('express');
const Comment = require('../models/comment');
const router = express.Router();


router.post("", (req, res, next) => {
    console.log("backend save.");
    const comment = new Comment({
        courseCode: req.body.courseCode,
        courseName: req.body.courseName,
        program: req.body.program,
        semester: req.body.semester,
        content: req.body.content
    });
    comment.save().then(createdComment => {
      res.status(201).json({
          message: 'Comment added successfully!',
          commentId: createdComment._id
      });
    });
});

router.put("/:id", (req, res, next) => {
    //console.log('router.put by id.');
  const comment = new Comment({
    _id: req.body.id,
    courseCode: req.body.courseCode,
    courseName: req.body.courseName,
    program: req.body.program,
    semester: req.body.semester,
    content: req.body.content
  });
  Comment.updateOne({_id:req.params.id}, comment).then(result => {
    console.log(result);
    res.status(200).json({ message: "Update succeeful!"});
  });
});

router.get("", (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const commentQuery = Comment.find();
    let fetchedComments;
    if(pageSize && currentPage) {
      commentQuery
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize);
    }
    commentQuery.then(documents => {
        //console.log(documents);
        fetchedComments = documents;
        return Comment.count();
    })
    .then(count => {
        res.status(200).json({
            message: 'Commets fetched successfully!',
            comments: fetchedComments,
            maxComents: count
        });
    });
});

router.get("/:id", (req, res, next) => {
    console.log('router.get by id.');
  Comment.findById(req.params.id).then(comment => {
    if(comment) {
      res.status(200).json(comment);
    }else{
      res.status(404).json({message: 'Comment not found!'});
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Comment.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Comment deleted!"});
  });
});

module.exports = router;