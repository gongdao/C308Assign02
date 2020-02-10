import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommentListComponent } from './Comments/comment-list/comment-list.component';
import { CommentCreateComponent } from './Comments/comment-create/comment-create.component';


const routes: Routes = [
  {path: '', component: CommentListComponent},
  {path: 'create', component:CommentCreateComponent},
  {path: 'edit/:commentId', component:CommentCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
