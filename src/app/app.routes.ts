import { Router, Routes } from '@angular/router';
import { AuthFormComponent } from './auth/auth-form/auth-form.component';
import { SendCodeComponent } from './auth/send-code/send-code.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ArticleComponent } from './article/article.component';
import { CartComponent } from './cart/cart.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { IndexComponent } from './userPanell/index/index.component';
import { HomeUserComponent } from './userPanell/home-user/home-user.component';
import { inject } from '@angular/core';
import { userPanelGuard } from './guard/user-panel.guard';
import { ProfileComponent } from './userPanell/profile/profile.component';
import { OrdersComponent } from './userPanell/orders/orders.component';
import { authGuard } from './guard/auth.guard';
import { IndexAdminComponent } from './Admin/index-admin/index-admin.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { UserComponent } from './Admin/user/user.component';
import { ProductsComponent } from './Admin/products/products.component';
import { CategoryComponent } from './Admin/category/category.component';
import { MenuComponent } from './Admin/menu/menu.component';
import { CommnetsComponent } from './Admin/commnets/commnets.component';
import { OdersComponent } from './Admin/oders/oders.component';
import { ArticleAdminComponent } from './Admin/article-admin/article-admin.component';
import { InfosComponent } from './Admin/infos/infos.component';
import { adminGuard } from './guard/admin.guard';
import { CountactUsComponent } from './Admin/countact-us/countact-us.component';

export const routes: Routes = [
    
    {path:'',component:HomeComponent},
    {path:'auth',component:AuthFormComponent,canActivate:[authGuard],
        children:[
        {path:'',component:SendCodeComponent},
        {path:'verifi-email',component:VerifyEmailComponent},
        {path:'register',component:RegisterComponent},
    ]},
    {path:'product',component:AllProductsComponent},
    {path:'product/:href',component:AllProductsComponent},
    {path:'articles',component:AllProductsComponent},
    {path:'product-one/:href',component:ProductInfoComponent},
    {path:'article/:href',component:ArticleComponent},
    {path:'cart',component:CartComponent},
    {path:'contact-us',component:ContactUsComponent},
    {path:'my-account',component:IndexComponent,canActivate:[userPanelGuard]
        ,children:[
        {path:'',component:HomeUserComponent},
        {path:'profile',component:ProfileComponent},
        {path:'orders',component:OrdersComponent},
    ]},
    {path:'admin',component:IndexAdminComponent,canActivate:[adminGuard],
        children:[
            {path:'',component:DashboardComponent},
            {path:'user',component:UserComponent},
            {path:'products',component:ProductsComponent},
            {path:'category',component:CategoryComponent},
            {path:'menu',component:MenuComponent},
            {path:'comments',component:CommnetsComponent},
            {path:'oders',component:OdersComponent},
            {path:'article',component:ArticleAdminComponent},
            {path:'info',component:InfosComponent},
            {path:'contact-us',component:CountactUsComponent},
        ]
    }
];
