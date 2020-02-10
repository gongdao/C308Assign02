import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule } from "@angular/common/http";
import { MatInputModule, 
  MatCardModule,
  MatButtonModule, 
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule
 } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentCreateComponent } from './Comments/comment-create/comment-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { CommentListComponent } from './Comments/comment-list/comment-list.component';


@NgModule({
  declarations: [
    AppComponent,
    CommentCreateComponent,
    HeaderComponent,
    CommentListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
