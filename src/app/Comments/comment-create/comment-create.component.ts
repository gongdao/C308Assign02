import { Component, OnInit} from '@angular/core';

import { Comment } from '../comment.model';
import { NgForm } from '@angular/forms';
import { CommentsService } from '../comments.service';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {
  enteredCourseCode = '';
  enteredCourseName = '';
  enteredProgram = '';
  enteredSemester = '';
  enteredContent = '';

  constructor(public commentsService: CommentsService) { }

  ngOnInit() {
  }

  onAddComment(form: NgForm){
    if(form.invalid) {
      return;
    }
    console.log("add comment.");
    this.commentsService.addComment(
      form.value.courseCode, 
      form.value.courseName,
      form.value.program,
      form.value.semester,
      form.value.content );
      form.resetForm();
  }
}
