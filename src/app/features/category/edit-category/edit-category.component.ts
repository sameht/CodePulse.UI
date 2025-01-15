import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request.module';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  
  id : string | null = null;
  paramsSubscription? : Subscription;
  editCategorySubscription? : Subscription;
  category? : Category;

  constructor(private route: ActivatedRoute,
    private categotyService: CategoryService,
    private router: Router
  ){
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params)=>{
        this.id = params.get('id');
        if(this.id){
          this.categotyService.getGategoryById(this.id).subscribe({
            next: (response => {
              this.category = response;
            })
          });
        }
      }
    })
  }
  onFormSubmit(){
    const updateCategoryRequest: UpdateCategoryRequest = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? ''
    }
    if(this.id){
      this.editCategorySubscription = this.categotyService.updateCategory(this.id, updateCategoryRequest).subscribe({
        next: () => {
          this.router.navigateByUrl('/admin/categories');
        }
      });
    }

  }
  onDelete(): void {
    if(this.id){
      this.categotyService.deleteCategory(this.id).subscribe({
        next: (response) =>{
          this.router.navigateByUrl('/admin/categories');
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
  }
}
