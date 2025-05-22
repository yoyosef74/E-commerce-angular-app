import { Component, Input } from '@angular/core';
import { IProducts } from '../../../Core/interfaces/http';
import { NgClass } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../Core/service/cart.service';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass, ButtonModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  constructor(private _cartService: CartService){}

  @Input({ required: true }) isSmallCard: boolean = false;
  @Input({ required: true }) Products!: IProducts[];
  isAddedToCart: boolean = false;

  addToCart(productId: string): void {
    const userId = localStorage.getItem('token')?? '';
    this._cartService.addToCart({userId , productId}).subscribe((next) => {
      console.log(next);
      this.isAddedToCart = true;
    })
  }
}
