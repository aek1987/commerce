// src/app/components/product-detail/product-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    const idParam = this.route.snapshot.paramMap.get('id'); // Récupère l'ID en tant que chaîne
  const id = idParam ? Number(idParam) : null; //
    console.log('ID du produit à charger:', id); // Ajoutez cette ligne
    
    this.productService.getProducts().subscribe(products => {
      console.log('ID du produit à charger:', products);
      this.product = products.find(p => p.id === id)!;
       // Ajoutez cette ligne
      if (!this.product) {
        console.error(`Aucun produit trouvé avec l'ID ${id}`);
      } else {
        console.log('Produit trouvé :', this.product);
      }
    }, error => {
      console.error('Erreur lors de la récupération des produits :', error);
    });
  }

  // Méthode pour ajouter un produit au panier
  addToCart(product: Product, event: MouseEvent) {
    console.log('Produit cliqué:', product);
    
    this.cartService.addProduct(product);

    // Position du toast basée sur la position du bouton
    const buttonElement = event.target as HTMLElement;
    const rect = buttonElement.getBoundingClientRect();
    const position = {
      top: rect.top + window.scrollY + 50 + 'px', // Ajuste la position verticale
      left: rect.left + window.scrollX + 'px' // Position horizontale
    };
    this.toastr.clear();
    this.toastr.success('Succès ! Produit ajouté au panier!', '', {
      positionClass: 'toast-custom-position',
      enableHtml: true,
      tapToDismiss: true,
      timeOut: 2000,
      onActivateTick: true,
      toastClass: `ngx-toastr toast-success`,
    });
  }
}
