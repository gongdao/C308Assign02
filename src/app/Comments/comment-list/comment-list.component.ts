import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';

import { Comment } from '../comment.model';
import { CommentsService } from '../comments.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit, OnDestroy {
  
  comments: Comment[] = [];
  isLoading = false;
  totalComments = 10;
  commentsPerPage = 4;
  currentPage = 1;
  pageSizeOptions = [1,2,5,10];
  private commentsSub: Subscription;
    // {title: 'First Post', content: 'This is the first comment\'s content'},
    // {title: 'Second Post', content: 'This is the second comment\'s content'},
    // {title: 'Third Post', content: 'This is the third comment\'s content'},
    // {title: 'Fourth Post', content: 'This is the four comment\'s content'}


  constructor(public commentsService: CommentsService) { 
    this.commentsService = commentsService;
  }

  ngOnInit() {
    this.isLoading = true;
    this.commentsService.getComments(this.commentsPerPage,this.currentPage);
    this.commentsSub = this.commentsService.getCommentUpdateListener()
    .subscribe((commentData:{comments:Comment[]}) => {
      this.isLoading = false;
      this.comments = commentData.comments;
    });
  }

  onChangedPage(pageData:PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.commentsPerPage = pageData.pageSize;
    this.commentsService.getComments(this.commentsPerPage,this.currentPage);
  }

  onDelete(commentId: string) {
    this.commentsService.deleteComment(commentId);
  }
  ngOnDestroy(): void {
    this.commentsSub.unsubscribe();
  }

}
