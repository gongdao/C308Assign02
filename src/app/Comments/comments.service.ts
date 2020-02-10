import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Comment} from './comment.model';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class CommentsService {
    comments: Comment[] = [];
    private commentsUpdated = new Subject<Comment[]>();

    constructor(private http: HttpClient, private router: Router){

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

    getComment(id: string) {
        return this.http.get<{_id: string,courseCode:string,courseName:string,program:string,
                        semester:string,content:string}>('http://localhost:4000/api/comments/' + id
        );
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
            this.router.navigate(["/"]);
        });
    }

    updateComment(id: string, courseCode:string,courseName:string,program:string,semester:string,content:string){
        const comment: Comment = {id:id,courseCode:courseCode,courseName:courseName,
            program:program,semester:semester,content:content};
        this.http.put('http://localhost:4000/api/comments/' + id, comment)
        .subscribe(response => {
            const updatedComments = [...this.comments];
            const oldCommentIndex = updatedComments.findIndex(c => c.id === comment.id);
            updatedComments[oldCommentIndex] = comment;
            this.comments = updatedComments;
            this.commentsUpdated.next([...this.comments]);
            this.router.navigate(["/"]);
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