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
  product: Product = {
    id: 3,
    name: 'Produit par défaut', // Valeur par défaut pour le nom
    price: 0,                  // Valeur par défaut pour le prix
    description: 'Description par défaut', // Valeur par défaut pour la description
    image: 'assets/phone2.jpg',   // URL par défaut pour l'image
    category: 'Catégorie par défaut' // Valeur par défaut pour la catégorie
  };
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
  
    this.productService.getProducts().subscribe(
      products => {
        console.log('Produits récupérés:', products); // Vérifiez la liste des produits
  
        // Trouver le produit correspondant à l'ID
        const foundProduct = products.find(p =>Number(p.id) === id);
  
        if (foundProduct) {
          this.product = foundProduct;
          console.log('Produit trouvé :', this.product);
        } else {
          console.error(`Aucun produit trouvé avec l'ID ${id}, affichage du produit par défaut.`);
        }
      },
      error => {
        console.error('Erreur lors de la récupération des produits :', error);
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
    this.router.navigate(['/delivery']);
  }
 
}
