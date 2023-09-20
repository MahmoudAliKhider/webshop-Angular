import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SliderComponent } from './components/slider/slider.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { CategoryComponent } from './pages/category/category.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductsComponent } from './pages/products/products.component';
import { CategoryHeaderComponent } from './components/category-header/category-header.component';
import { SideFilterComponent } from './components/side-filter/side-filter.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component'; // Import NgxPaginationModule here

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SliderComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    SignUpComponent,
    CategoryComponent,
    NotFoundComponent,
    BrandsComponent,
    ProductsComponent,
    CategoryHeaderComponent,
    SideFilterComponent,
    ProductDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    NgxPaginationModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
