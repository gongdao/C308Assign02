import { Component, OnInit} from '@angular/core';

import { Comment } from '../comment.model';
import { NgForm } from '@angular/forms';
import { CommentsService } from '../comments.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

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
  isLoading = false;
  private mode = 'create';
  private commentId: string;
  comment: Comment;

  constructor(public commentsService: CommentsService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      console.log(paramMap);
      if( paramMap.has('commentId')) {
        this.mode = 'edit';
        this.commentId = paramMap.get('commentId');
        this.isLoading = true;
        this.commentsService.getComment(this.commentId)
        .subscribe(commentData => {
          this.isLoading = false;
          this.comment = {
            id:commentData._id,
            courseCode:commentData.courseCode,
            courseName:commentData.courseName,
            program:commentData.program,
            semester:commentData.semester,
            content:commentData.content
          }
        });
        console.log(this.commentId);
      } else {
        this.mode = 'create';
        this.commentId = null;
        console.log(this.commentId);
      }
    });
  }

  onSaveComment(form: NgForm){
    if(form.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create') {
      this.commentsService.addComment(
        form.value.courseCode, 
        form.value.courseName,
        form.value.program,
        form.value.semester,
        form.value.content );
      } else {
        this.commentsService.updateComment(
          this.commentId,
          form.value.courseCode, 
          form.value.courseName,
          form.value.program,
          form.value.semester,
          form.value.content
          );
      }
      form.resetForm();
    }
}
