import { Component, OnInit, OnDestroy, Output, Inject } from '@angular/core';
import { ApiService } from '../services/api-service.service';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductsQuickViewComponent } from '../products-quick-view/products-quick-view.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  categories: any = [];
  products: Array<any> = [];
  filteredProducts: Array<any> = [];

  isLoading: boolean = false;
  dashboardDataSubscription: any = Subscription;
  @Output() hoveredProduct: any;
  selectedCategory:any = 'all';
  constructor(private apiService: ApiService, private dialog:MatDialog) {}

  ngOnInit(): void {
    this.apiToloadDashboardData();
  }

  apiToloadDashboardData = () => {
    this.isLoading = true;
    this.dashboardDataSubscription = this.apiService
      .loadDashboardData('')
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.products = response['products'];
          this.filteredProducts = response['products'];
          // let cat : any = [];
          // this.products.forEach((item:any) => {
          //   Object.keys(item).forEach(function(key:any){
          //     if(key == 'category'){
          //       cat.push(item[key]);
          //     }
          //   })
          // })
          this.categories = [... new Set(this.products.map((item:any) => item.category))]
          this.products.forEach((item: any) => {
            item['favoriteIcon'] = 'favorite_border';
          });
          this.isLoading = false;
          console.log(this.categories);
        },
        error: (error: any) => {
          console.log(error);
          this.isLoading = false;
        },
      });
  };

  addToFavorites(selectedItem: any) {
    console.log(selectedItem);
    selectedItem['favoriteIcon'] == 'favorite'
      ? (selectedItem['favoriteIcon'] = 'favorite_border')
      : (selectedItem['favoriteIcon'] = 'favorite');
  }

  showDetails(hoveredProduct:any){
    console.log(hoveredProduct);
    const openDialog = new MatDialogConfig();
    this.hoveredProduct = hoveredProduct;
      openDialog.direction = 'ltr';
      openDialog.width= '1160px';
      openDialog.data = { product: this.hoveredProduct };
      openDialog.direction = 'ltr';
      openDialog.enterAnimationDuration= '1s';
      openDialog.exitAnimationDuration = '1s';

      const dialogRef = this.dialog.open(ProductsQuickViewComponent, openDialog);
  
      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    
  }

  filterProducts(selectedCategory :any){
    console.log(selectedCategory);
    if(selectedCategory !== 'all'){
      this.filteredProducts = this.products.filter((item:any) => {
        return item.category === selectedCategory;
      })
    }
    else{
      this.filteredProducts = this.products;
    }
    
  }
  

  ngOnDestroy(): void {
    this.dashboardDataSubscription.unsubscribe();
    //throw new Error('Method not implemented.');
  }
}
