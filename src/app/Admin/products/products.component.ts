import { Component, Injector, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { HomeService } from '../../home/home.service';
import { Product } from '../../Models/product.model';
import { JalaliDateSimplePipe } from "../../jalali-date-simple.pipe";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { title } from 'process';
import { ProductsService } from './products.service';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../category/category.service';
import { CateGory } from '../../Models/category.model';
import { CommonModule } from '@angular/common';
import { ConfirmModalDeleteComponent } from "../confirm-modal-delete/confirm-modal-delete.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [JalaliDateSimplePipe, ReactiveFormsModule, CommonModule, ConfirmModalDeleteComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  Number(arg0: number): string {
    throw new Error('Method not implemented.');
  }
  product!: Product[]
  ProductForm!: FormGroup
  cover: any
  isEdit: boolean = false
  category!: CateGory[]
  categoryID: any
  productID:string=''
  constructor(private authService: AuthService, private adminService: AdminService, private homeservice: HomeService, private productService: ProductsService,
    private injector: Injector, private categoriService: CategoryService
  ) { }
  ngOnInit(): void {
    this.adminService.setTitle('محصولات ')
    this.ProductForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      price: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required, Validators.minLength(20)]),
      cover: new FormControl(null, [Validators.required]),
      href: new FormControl(null, [Validators.required]),
      categoryId: new FormControl(null, [Validators.required]),
      discount: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required]),
      weight: new FormControl(null, [Validators.required]),
      packageWeight: new FormControl(null, [Validators.required]),
      dimensions: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      numberHygiene: new FormControl(null, [Validators.required]),
      brand: new FormControl(null, [Validators.required]),
      code: new FormControl(null, [Validators.required]),
      combinations: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    })
    this.ShowAllProducts()
    this.ShowAllCategorise()
  }
  ShowAllProducts() {
    this.homeservice.getAllProduct().subscribe({
      next: (data: Product[]) => {
        this.product = data
      }
    })
  }
  ShowAllCategorise() {
    this.authService.refreshToken().subscribe({
      complete: () => {
        this.categoriService.GetShowAllCategorise().subscribe({
          next: (res: CateGory[]) => {
            
            this.category = res
          }
        })
      }
    })
  }

  adressCover(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.cover = input.files[0];
    }
  }
  categoryId(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input) {
      this.categoryID = input.value
      // console.log(this.categoryID);

    }
  }

  checkPositiveNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (parseFloat(input.value) < 0) {
      input.value = '0';
    }
  }
  preventNegativeAndPlus(event: KeyboardEvent): void {
    if (event.key === '-' || event.key === '+') {
      event.preventDefault();
    }
  }

  sendProduct() {
    if (this.ProductForm.invalid) {
      this.ProductForm.markAllAsTouched();
      return;
    }
    if (this.isEdit) {
      const formData = new FormData()
      formData.append('title', this.ProductForm.value.title)
      formData.append('price', this.ProductForm.value.price)
      formData.append('description', this.ProductForm.value.description)
      formData.append('href', this.ProductForm.value.href)
      formData.append('categoryId', this.ProductForm.value.categoryId)
      formData.append('discount', this.ProductForm.value.discount)
      formData.append('number', this.ProductForm.value.number)
      formData.append('weight', this.ProductForm.value.weight)
      formData.append('packageWeight', this.ProductForm.value.packageWeight)
      formData.append('dimensions', this.ProductForm.value.dimensions)
      formData.append('type', this.ProductForm.value.type)
      formData.append('numberHygiene', this.ProductForm.value.numberHygiene)
      formData.append('brand', this.ProductForm.value.brand)
      formData.append('code', this.ProductForm.value.code)
      formData.append('combinations', this.ProductForm.value.combinations)
      formData.append('cover', this.cover)

      this.authService.refreshToken().subscribe({
        complete:()=>{
          this.productService.PutProduct(formData,this.productID).subscribe({
            complete:()=>{
              this.ShowAllProducts()
              this.ProductForm.reset()
              const toastr = this.injector.get(ToastrService);
              toastr.success(`محصول مورد نظر بروز رسانی شد`, '');
              this.isEdit=false
            }
          })
        }
      })

    } else {

      const formData = new FormData()
      formData.append('title', this.ProductForm.value.title)
      formData.append('price', this.ProductForm.value.price)
      formData.append('description', this.ProductForm.value.description)
      formData.append('href', this.ProductForm.value.href)
      formData.append('categoryId', this.ProductForm.value.categoryId)
      formData.append('discount', this.ProductForm.value.discount)
      formData.append('number', this.ProductForm.value.number)
      formData.append('weight', this.ProductForm.value.weight)
      formData.append('packageWeight', this.ProductForm.value.packageWeight)
      formData.append('dimensions', this.ProductForm.value.dimensions)
      formData.append('type', this.ProductForm.value.type)
      formData.append('numberHygiene', this.ProductForm.value.numberHygiene)
      formData.append('brand', this.ProductForm.value.brand)
      formData.append('code', this.ProductForm.value.code)
      formData.append('combinations', this.ProductForm.value.combinations)
      formData.append('cover', this.cover)

      this.authService.refreshToken().subscribe({
        complete: () => {

          this.productService.PostCreateProduct(formData).subscribe({
            complete: () => {
              this.ShowAllProducts()
              this.ProductForm.reset()
              const toastr = this.injector.get(ToastrService);
              toastr.success(`محصول مورد نظر افزوده شد`, '');
            }
          })
        }
      })
    }
  }

  selectedItem(id: string, title: string, weight: number, price: number, discount: number, dimensions: number, number: number, type: string, href: string, packageWeight: number, numberHygiene: string, combinations: string, code: string, brand: string, description: string) {
    this.ProductForm.get('title')?.setValue(title)
    this.ProductForm.get('weight')?.setValue(weight)
    this.ProductForm.get('price')?.setValue(price)
    this.ProductForm.get('discount')?.setValue(discount)
    this.ProductForm.get('dimensions')?.setValue(dimensions)
    this.ProductForm.get('number')?.setValue(number)
    this.ProductForm.get('type')?.setValue(type)
    this.ProductForm.get('href')?.setValue(href)
    this.ProductForm.get('packageWeight')?.setValue(packageWeight)
    this.ProductForm.get('numberHygiene')?.setValue(numberHygiene)
    this.ProductForm.get('combinations')?.setValue(combinations)
    this.ProductForm.get('code')?.setValue(code)
    this.ProductForm.get('brand')?.setValue(brand)
    this.ProductForm.get('description')?.setValue(description)
    this.productID=id
    this.isEdit = true
  }

  removeProduct(id:string,title:string){
    this.authService.refreshToken().subscribe({
      complete:()=>{
        this.adminService.openModal('حذف محصول',title,()=>{
          this.productService.DeleteProduct(id).subscribe({
          complete:()=>{
            this.ShowAllProducts()
              
              const toastr = this.injector.get(ToastrService);
              toastr.success(`محصول مورد نظر حذف شد`, '');
          }
        })
        })
        
      }
    })
  }
}
