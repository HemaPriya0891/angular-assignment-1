import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './services/interceptor.service';
import { ApiService } from './services/api-service.service';
import { HeaderComponent } from './header/header.component';
import { UtilService } from './services/util.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSpinnerOverlayComponent } from './mat-spinner-overlay/mat-spinner-overlay.component';
import {MatSelectModule} from '@angular/material/select';
import { ProductsQuickViewComponent } from './products-quick-view/products-quick-view.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { StarRatingModule } from 'angular-star-rating';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    MatSpinnerOverlayComponent,
    ProductsQuickViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatGridListModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule,BrowserAnimationsModule,MatCardModule, MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatDialogModule,
    StarRatingModule.forRoot()
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, ApiService, UtilService, 
    {provide: MatDialogRef, useValue:{}}, {provide: MAT_DIALOG_DATA, useValue:{}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
