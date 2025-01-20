import { Injectable } from '@angular/core';
import { AddBlogpost } from '../models/add-blog-post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Blogpost } from '../models/blog-post.model';
import { lastValueFrom, Observable } from 'rxjs';
import { UpdateCategoryRequest } from '../../category/models/update-category-request.module';
import { UpdateBlogpost } from '../models/update-blog-post.model';

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

  updateBlogPostById(id: string, request: UpdateBlogpost): Promise<Blogpost | undefined>{
    const observable$ = this.http.put<Blogpost>(`${environment.apiBaseUrl}/api/blogPost/${id}`, request);
    return lastValueFrom(observable$);
  }

  deleteBlogPostById(id: string): Promise<Blogpost | undefined>{
    const observable$ = this.http.delete<Blogpost>(`${environment.apiBaseUrl}/api/blogPost/${id}`);
    return lastValueFrom(observable$);
  }
}
