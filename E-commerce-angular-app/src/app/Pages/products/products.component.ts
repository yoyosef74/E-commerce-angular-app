import { IProducts } from '../../Core/interfaces/http';
import { CardComponent } from '../../shared/card/card/card.component';
import { ProductsService } from './../../Core/service/products.service';
import { Component } from '@angular/core';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SearchProductPipe } from '../../Core/pipes/search-product.pipe';
import { CartService } from '../../Core/service/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CardComponent,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    FormsModule,
    SearchProductPipe
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  constructor(private _productsService: ProductsService, private _cart: CartService){}
  allProducts:IProducts[] = [];
  searchKey: string = '';

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
      this._productsService.allProducts().subscribe((response: any) => {
        this.allProducts = response.products.map((product: IProducts) => {
          return {
            ...product,
            isAddedToCart: this._cart.isAddedToCart(product) || false,
          };
        });
      });
  }

}
