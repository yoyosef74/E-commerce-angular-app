import { Component, Input } from '@angular/core';
import { IProducts } from '../../../Core/interfaces/http';
import { NgClass } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../Core/service/cart.service';
import { NotificationsService } from '../../../Core/service/notifications.service';
import { EmptyComponent } from "../../empty/empty.component";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass, ButtonModule, RouterLink, EmptyComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  constructor(private _cartService: CartService, private _notificationsService: NotificationsService){}

  @Input({ required: true }) isSmallCard: boolean = false;
  @Input({ required: true }) Products!: IProducts[];
  @Input() searchKey : string = '';
  isAddedToCart: boolean = false;

  addToCart(product: IProducts) {
    this._cartService.addToCart(product);
  }
}
