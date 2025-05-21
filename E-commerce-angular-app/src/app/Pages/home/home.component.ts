import { Component } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { UserDataService } from '../../Core/service/user-data.service';
import { IProducts } from '../../Core/interfaces/http';
import { CardComponent } from '../../shared/card/card/card.component';
import { PopularPipe } from '../../Core/pipes/popular.pipe';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GalleriaModule, CardComponent, PopularPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private _userDataService: UserDataService){}

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
      this._userDataService.allProducts().subscribe((next) => {
        this.smallProducts = next.products.slice(0,4);
        this.popularProducts = next.products;
      });
    }

}
