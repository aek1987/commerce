// src/app/components/product-detail/product-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../service/products.service';
import { Product } from '../modeles/product.model';
import { CartService } from '../service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product = { name: '',
    id:0,
    price: 0,
    description: '',
    image: '',
    category: '',
    ecran: '',
    processor: '',
    os: '',
    storage: '',
    ram: '',
    battery: '',
    wirelessCharging: '',
    color: '',
    dualsim: '' };
 // Utiliser null par défaut

  constructor(
    private route: ActivatedRoute,private router: Router,
    private productService: ProductsService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
   
       this.loadProduct();
  }

  loadProduct(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id =Number(idParam);;
  
    console.log('ID du produit à charger:', id); // Log de l'ID
  
    if (id === null) {
      console.error('ID invalide.');
      return; // Sortir si l'ID est nul
    }
  
    this.productService.getProductpropertise(String(id)).subscribe(
      (response) => {
        if (response) {
          console.log('Produit récupéré:', response);
          console.log('Produit image :', response.image);
          this.product = response;
        } else {
          console.error(`Aucun produit trouvé avec l'ID ${id}, affichage du produit par défaut.`);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération du produit:', error);
      }
    );

  }
    
  goToConfirmationPage() {
   
    this.router.navigate(['/confirm-order']);

    
  }
  // Méthode pour ajouter un produit au panier
  addToCart(product: Product, event: MouseEvent) {
    console.log('Produit cliqué:', product);
    
    this.cartService.addProduct(product);
    this.router.navigate(['/delivery']);
  }
 
}
