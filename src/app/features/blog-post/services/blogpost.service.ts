import { Injectable } from '@angular/core';
import { AddBlogpost } from '../models/add-blog-post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Blogpost } from '../models/blog-post.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

  constructor(private http: HttpClient) { }

  addBlogPost(blogPost: AddBlogpost): Observable<Blogpost>{
    return this.http.post<Blogpost>(`${environment.apiBaseUrl}/api/blogPost`, blogPost);
  }

  getAllBlogPostes(): Observable<Blogpost[]>{
    return this.http.get<Blogpost[]>(`${environment.apiBaseUrl}/api/blogPost`);
  }

  getBlogPostById(id: string): Observable<Blogpost>{
    return this.http.get<Blogpost>(`${environment.apiBaseUrl}/api/blogPost/${id}`);
  }
}
