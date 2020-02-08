import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Comment} from './comment.model';

@Injectable({providedIn: 'root'})
export class CommentsService {
    comments: Comment[] = [];
    private commentsUpdated = new Subject<Comment[]>();

    constructor(private http: HttpClient){

    }

    getComments(){
        this.http.get<{ message: string, comments: any }>('http://localhost:4000/api/comments')
        .pipe(map((commentData) => {
            return commentData.comments.map(comment => {
                return {
                    courseCode: comment.courseCode,
                    courseName: comment.courseName,
                    program: comment.program,
                    semester: comment.semester,
                    content: comment.content,
                    id: comment._id
                };
            });
        }))
        .subscribe((transformedComments) => {
            this.comments = transformedComments;
            this.commentsUpdated.next([...this.comments]);
        });
    }

    getCommentUpdateListener(){
        return this.commentsUpdated.asObservable();
    }

    addComment(courseCode: string, courseName: string, program: string, semester: string, content: string){
        const comment: Comment = { id: null, courseCode, courseName, program, semester, content };
        this.http.post<{message: string, commentId: string}>('http://localhost:4000/api/comments', comment)
        .subscribe((responseData) => {
            console.log(responseData.message);
            const id = responseData.commentId;
            comment.id = id;
            this.comments.push(comment);
            this.commentsUpdated.next([...this.comments]);
        });
    }
    deleteComment(commentId: string){
        this.http.delete('http://localhost:4000/api/comments/' + commentId)
        .subscribe(() => {
            console.log('deleted!');
            const updatedComments = this.comments.filter(comment => comment.id !== commentId);
            this.comments = updatedComments;
            this.commentsUpdated.next([...this.comments]);
        });
    }
}