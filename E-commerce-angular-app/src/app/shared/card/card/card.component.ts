import { Component, Input } from '@angular/core';
import { IProducts } from '../../../Core/interfaces/http';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input({ required: true }) isSmallCard: boolean = false;
  @Input({ required: true }) Products!: IProducts[];
}
