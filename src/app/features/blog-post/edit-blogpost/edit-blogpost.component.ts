import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogpostService } from '../services/blogpost.service';
import { Blogpost } from '../models/blog-post.model';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { UpdateBlogpost } from '../models/update-blog-post.model';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit, OnDestroy{

  id: string | null = null;
  routeSubscription? : Subscription;
  updateBlogPostSubscription? : Subscription;
  getBlogPostSubscription? : Subscription;
  categories$?: Observable<Category[]>;
  model? : Blogpost;
  selectedCategories? : string[];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private blogpostService: BlogpostService,
    private categoryService: CategoryService
  ){

  }
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params)=>{
        this.id = params.get('id');
        if(this.id)
        this.getBlogPostSubscription = this.blogpostService.getBlogPostById(this.id).subscribe({
          next: (response)=>{
            this.model = response;
            this.selectedCategories = response.categories.map(x => x.id); 
          }
        })
      }
    })
  }

  onFormSubmit(){
    if(this.id && this.model){
      var updateBlogpost: UpdateBlogpost = {  
        title: this.model.title,
        shortDescription: this.model.shortDescription,
        content: this.model.content,
        urlHandle: this.model.urlHandle,
        featuredImageUrl: this.model.featuredImageUrl,
        author: this.model.author,
        isVisible: this.model.isVisible,
        publishedDate: this.model.publishedDate,
        categories: this.selectedCategories ?? []
      }

      this.blogpostService.updateBlogPostById(this.id, updateBlogpost).then(response=>{
        
          this.router.navigateByUrl("/admin/blogposts");
        
      })
    }
  }


  onDelete(): void{
    if(this.id){
      this.blogpostService.deleteBlogPostById(this.id).then(data=>{
        this.router.navigateByUrl("/admin/blogposts")
      })
    }
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
  }


}
