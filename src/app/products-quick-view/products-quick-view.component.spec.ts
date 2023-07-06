import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsQuickViewComponent } from './products-quick-view.component';

describe('ProductsQuickViewComponent', () => {
  let component: ProductsQuickViewComponent;
  let fixture: ComponentFixture<ProductsQuickViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsQuickViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsQuickViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
