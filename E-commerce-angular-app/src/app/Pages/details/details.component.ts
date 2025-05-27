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

  displayDetails() : void {
    this._activatedRoute.data.subscribe( (data) => {
      this.productDetails = data['details'].product
    });
  }

  addToCart(productId: string): void {
    const userId = localStorage.getItem('token')?? '';

    this._cartService.addToCart({userId , productId}).subscribe((next) => {

      this._notificationsService.showSuccess('success', next.message);

      this._cartService.countOfCart.next(next.cart.length);

      this.isAddedToCart = true;

      const storedCart = localStorage.getItem('cartState');
      const cartState = storedCart? JSON.parse(storedCart) : {};

      cartState[productId] = true;
      localStorage.setItem('cartState', JSON.stringify(cartState));
    })
  }
}
