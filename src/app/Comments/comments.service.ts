import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Comment} from './comment.model';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class CommentsService {
    comments: Comment[] = [];
    private commentsUpdated = new Subject<{comments:Comment[], commentCount:number}>();

    constructor(private http: HttpClient, private router: Router){

    }

    getComments(commentsPerPage: number, currentPage: number){
        const queryParams = `?pagesize=${commentsPerPage}&page=${currentPage}`;
        this.http
        .get<{ message: string; comments: any; maxComments:number }>(
            'http://localhost:4000/api/comments' + queryParams
        )
        .pipe(
            map((commentData) => {
                return { 
                    comments:commentData.comments.map(comment => {
                        return {
                            courseCode: comment.courseCode,
                            courseName: comment.courseName,
                            program: comment.program,
                            semester: comment.semester,
                            content: comment.content,
                            id: comment._id
                        };
                    }),
                    maxComments: commentData.maxComments
                };
            })
        )
        .subscribe(transformedCommentData => {
            this.comments = transformedCommentData.comments;
            this.commentsUpdated.next({ 
                comments:[...this.comments], 
                commentCount: transformedCommentData.maxComments});
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
            this.router.navigate(["/"]);
        });
    }

    updateComment(id: string, courseCode:string,courseName:string,program:string,semester:string,content:string){
        const comment: Comment = {id:id,courseCode:courseCode,courseName:courseName,
            program:program,semester:semester,content:content};
        this.http.put('http://localhost:4000/api/comments/' + id, comment)
        .subscribe(response => {
            this.router.navigate(["/"]);
        });
    }

    deleteComment(commentId: string){
        this.http.delete('http://localhost:4000/api/comments/' + commentId)
        .subscribe(() => {
            console.log('deleted!');
        });
    }
}