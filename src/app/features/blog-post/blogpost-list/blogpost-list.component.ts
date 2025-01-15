import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Blogpost } from '../models/blog-post.model';
import { BlogpostService } from '../services/blogpost.service';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit{
  blogPosts$? : Observable<Blogpost[]>;

  constructor(private blogPostService: BlogpostService) {
    
  }
  ngOnInit(): void {
    this.blogPosts$ = this.blogPostService.getAllBlogPostes();
  }
  onEditClicked(){
  
  }
}
