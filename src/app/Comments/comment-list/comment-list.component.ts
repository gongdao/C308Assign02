import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';

import { Comment } from '../comment.model';
import { CommentsService } from '../comments.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit, OnDestroy {
  
  comments: Comment[] = [];
  private commentsSub: Subscription;
    // {title: 'First Post', content: 'This is the first comment\'s content'},
    // {title: 'Second Post', content: 'This is the second comment\'s content'},
    // {title: 'Third Post', content: 'This is the third comment\'s content'},
    // {title: 'Fourth Post', content: 'This is the four comment\'s content'}


  constructor(public commentsService: CommentsService) { 
    this.commentsService = commentsService;
  }

  ngOnInit() {
    this. commentsService.getComments();
    this.commentsSub = this.commentsService.getCommentUpdateListener()
    .subscribe((comments:Comment[]) => {
      this.comments = comments;
    });
  }
  onDelete(commentId: string) {
    this.commentsService.deleteComment(commentId);
  }
  ngOnDestroy(): void {
    this.commentsSub.unsubscribe();
  }

}
