import { Component } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { IProducts } from '../../Core/interfaces/http';
import { CardComponent } from '../../shared/card/card/card.component';
import { PopularPipe } from '../../Core/pipes/popular.pipe';
import { ProductsService } from '../../Core/service/products.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GalleriaModule, CardComponent, PopularPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private _productsService: ProductsService){}

  images: any[] | undefined;
  smallProducts!: IProducts[];
  popularProducts!: IProducts[];

    ngOnInit() {
      this.images = [
        {
          itemImageSrc: 'assets/product-1.jpg',
          alt: 'Description for Image 1',
          title: 'Title 1'
        },
                {
          itemImageSrc: 'assets/product-2.jpg',
          alt: 'Description for Image 1',
          title: 'Title 1'
        },
                {
          itemImageSrc: 'assets/product-3.jpg',
          alt: 'Description for Image 1',
          title: 'Title 1'
        },
                {
          itemImageSrc: 'assets/product-4.jpg',
          alt: 'Description for Image 1',
          title: 'Title 1'
        }
      ];

      this.getAllProducts();
    }

    getAllProducts(): void {
      this._productsService.allProducts().subscribe((next) => {
        this.smallProducts = next.slice(0,4);
        this.popularProducts = next;
      });
    }

}
