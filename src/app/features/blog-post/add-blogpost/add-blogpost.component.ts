import { Component } from '@angular/core';
import { AddBlogpost } from '../models/add-blog-post.model';
import { BlogpostService } from '../services/blogpost.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent {
  model: AddBlogpost;

  constructor(private blogPostService: BlogpostService,
    private router: Router
  ){
    this.model = {
      title: '',
      shortDescription: '',
      content: '',
      urlHandle: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date()
    }
  }

  onFormSubmit(){
    this.blogPostService.addBlogPost(this.model).subscribe({
      next: response =>{
        this.router.navigateByUrl('/admin/blogposts')
      }

    }
    );
  }
}
