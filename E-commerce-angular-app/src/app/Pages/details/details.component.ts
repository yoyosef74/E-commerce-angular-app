import { Component } from '@angular/core';
import { ProductsService } from '../../Core/service/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProducts } from '../../Core/interfaces/http';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../Core/service/cart.service';
import { NotificationsService } from '../../Core/service/notifications.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ButtonModule, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cartService: CartService,
    private _notificationsService: NotificationsService
  ){}

  id: string = '' ;
  productDetails: IProducts = {} as IProducts;
  isAddedToCart: boolean = false;

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((next: any) => this.id = next.params['id']);
    this.displayDetails();
  }

  displayDetails(): void {
    this._activatedRoute.data.subscribe((data: any) => {
      this.productDetails = {
        ...data.details.product,
        isAddedToCart: this._cartService.isAddedToCart(data.details.product),
      };
    });
  }

  addToCart(product: IProducts) {
    this._cartService.addToCart(product);
  }
}
