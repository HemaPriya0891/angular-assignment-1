import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-products-quick-view',
  templateUrl: './products-quick-view.component.html',
  styleUrls: ['./products-quick-view.component.scss']
})
export class ProductsQuickViewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,public dialogRef: MatDialogRef<ProductsQuickViewComponent>) {
    console.log(data['product']);
   }
  choosenProduct:any;
  
  ngOnInit(): void {
      const openDialog = new MatDialogConfig();
      openDialog.direction = 'ltr';
      this.choosenProduct = this.data['product'];
  }

}
