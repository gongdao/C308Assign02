import { Component, OnInit} from '@angular/core';

import { Comment } from '../comment.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  comment: Comment;
  form: FormGroup;
  private mode = 'create';
  private commentId: string;

  constructor(public commentsService: CommentsService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      'courseCode': new FormControl('',{validators: [Validators.required, Validators.minLength(3)]}),
      'courseName': new FormControl(''),
      'program': new FormControl(''),
      'semester': new FormControl(''),
      'content': new FormControl('',{validators: [Validators.required, Validators.minLength(3)]})
    });
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
          };
          console.log(this.comment);
          this.form.setValue({
            courseCode:this.comment.courseCode,
            courseName:this.comment.courseName,
            program:this.comment.program,
            semester:this.comment.semester,
            content:this.comment.content
          });
        });
        console.log(this.commentId);
      } else {
        this.mode = 'create';
        this.commentId = null;
        console.log(this.commentId);
      }
    });
  }

  onSaveComment(){
    if(this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create') {
      this.commentsService.addComment(
        this.form.value.courseCode, 
        this.form.value.courseName,
        this.form.value.program,
        this.form.value.semester,
        this.form.value.content );
      } else {
        this.commentsService.updateComment(
          this.commentId,
          this.form.value.courseCode, 
          this.form.value.courseName,
          this.form.value.program,
          this.form.value.semester,
          this.form.value.content
          );
      }
      this.form.reset();
    }
}
