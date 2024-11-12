import { Component } from '@angular/core';
import { CartService } from '../service/cart.service';  // Importer le service du panier
import { Product } from '../modeles/product.model';
import { faShoppingCart, faCartPlus } from '@fortawesome/free-solid-svg-icons'; // Importer les icônes
import { ProductsService } from '../service/products.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  // Liste des produits avec nom, prix et description
  products :Product[]=[]; 
  showButton: boolean = false;
  filteredProducts: Product[] = [];
    

  categories: string[] = ['All', 'Oppo', 'Redmi','ITEL', 'realme','Apple', 'Samsung', 'Xiaomi']; // Liste des catégories
  selectedCategory: string = 'All'; // Catégorie sélectionnée

  faCartPlus = faCartPlus; // Déclarer l'icône dans la classe du composant
  notificationMessage: string | null = null;  // Message de notification
  notifiedProductId: number | null = null;  // ID du produit notifié


  lastAvailableDate: string | null = null;  
  selectedColor: string | null = null;
  selectedCategories: string[] = [];
  isHoveredProduct: string | null = null; // ID du produit actuellement survolé
  isHovered: boolean = false; // Ajoute une variable pour gérer l'état du curseur
 
  // Tableau des produits dans le panier
  cart: Product[] = [];
  selectedPriceLimit: number =0;
  isLoading: boolean = true;
  
minPrice: number = 4000;  // Prix min par défaut
maxPrice: number = 400000;  // Prix max par défaut
maxLimit: number = 400000;  // Limite maximale pour le slider
  constructor(private cartService: CartService,private productService: ProductsService,private toastr: ToastrService, private router: Router,private translate: TranslateService)
    {
    
    }
   

    ngOnInit() {
    
      this.isLoading = true;
      this.productService.getProducts().subscribe(
      (data: Product[]) => {
      this.products = data;
      this.filteredProducts = this.products;
      this.isLoading = false; // Désactiver le spinner une fois les produits chargés
      if (!this.products || this.products.length === 0) {
        console.log("aucun produit trouvé sur url");
      }
      
    },
    (error) => {
      console.error("Erreur lors du chargement des produits", error);
      this.isLoading = false; // Désactiver le spinner en cas d'erreur
    }
  );
   console.log("liste des produit charge: "+this.filteredProducts);     
  }
  // Méthode pour ajouter un produit au panier
  addToCart(product: Product,event: MouseEvent) {
        console.log('Produit clique:', product);
    event.stopPropagation(); // Empêche le clic du bouton de déclencher le clic de la carte
    this.cartService.addProduct(product); 
    
  }
   // Méthode pour calculer le total du panier
   calculateTotal(): number {
    return this.cart.reduce((total, product) => total + product.price, 0);
  }


  goToProductDetail(product :Product ){
    this.router.navigate(['/product', product.id]);
  }


onMouseEnter(productId: Number) {
 this.isHoveredProduct = productId.toString(); // Met à jour l'ID du produit survolé/ Met à jour l'état quand le curseur est sur le produit
}

onMouseLeave() {
  this.isHoveredProduct = null; // Réinitialise l'ID lorsque la souris quitte le produit // Rétablit l'état quand le curseur quitte le produit
}


onCategoryChange(event: Event) {
  const checkbox = event.target as HTMLInputElement;
  const value = checkbox.value;

  if (checkbox.checked) {
    // Ajouter la catégorie sélectionnée
    this.selectedCategories.push(value);
  } else {
    // Retirer la catégorie désélectionnée
    this.selectedCategories = this.selectedCategories.filter(cat => cat !== value);
  }

  console.log('Catégories sélectionnées :', this.selectedCategories);
  // Applique le filtre avec les catégories sélectionnées
  this.applyFilters();
}
dropdownOpen: boolean = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }



applyFilters() {
  // Commencer par les produits d'origine
  let filtered = [...this.products];

  // 1. Appliquer le filtre de prix (via slider ou case à cocher)
  
  // Si une case de prix est cochée (prioritaire par rapport au slider)
  if (this.selectedPriceLimit!=0) {
    
    filtered = filtered.filter(product => product.price < this.selectedPriceLimit);
    console.log("une case de prix est cochée"+this.selectedPriceLimit)
  } 
  // Sinon appliquer le filtre de slider (si aucune case à cocher n'est active)
  else if (!this.selectedPriceLimit && this.minPrice !== undefined && this.maxPrice !== undefined) {
   //"aucune case coche : filftred par slider
    filtered = filtered.filter(product => product.price >= this.minPrice && product.price <= this.maxPrice);                                                                                                                                                                                                                                                                                                  
  }

  // 2. Appliquer le filtre de marques si des marques sont sélectionnées
  console.log("taill sélectionné)"+this.selectedCategories.length);
if (this.selectedCategories.length > 0) {
  if (this.selectedCategories.includes('All')) {
    // Si 'All' est sélectionné, on ne filtre pas les produits par catégorie
    filtered = filtered;  // Aucun filtre par catégorie
    console.log("Tous les produits sont affichés (All sélectionné)");
  } else {
    // Sinon, filtrer les produits par catégorie (marque)
    filtered = filtered.filter(product => this.selectedCategories.includes(product.category));
    console.log("Filtre appliqué par marque : " + this.selectedCategories.join(", "));
  }
}

  // Mettre à jour la liste filtrée
  this.filteredProducts = filtered;
}

// Méthode pour gérer la sélection des prix via case à cocher
onPriceFilterChange(event: any) {
  const priceLimit = Number(event.target.value);
  const isChecked = event.target.checked;

  if (isChecked) {
    // Définir la limite de prix sélectionnée si la case est cochée
    this.selectedPriceLimit = priceLimit;

    // Décocher les autres cases
    const checkboxes = document.querySelectorAll('.form-check-input');
    checkboxes.forEach((checkbox) => {
      if (checkbox !== event.target) {
        (checkbox as HTMLInputElement).checked = false;
      }
    });
  } else {
    // Si la case est décochée, réinitialiser la limite de prix
    this.selectedPriceLimit = 0;
  }

  // Appliquer les filtres après le changement
  this.applyFilters();
}

// Méthode pour gérer la plage de prix via slider
onPriceChange(): void {
  // Vérifier que la valeur minPrice est inférieure à maxPrice
 
  if (this.minPrice > this.maxPrice) {
    this.minPrice = this.maxPrice;
  }
  // Réinitialiser la limite de prix sélectionnée (si le slider est utilisé, les cases à cocher ne sont plus actives)
  this.selectedPriceLimit = 0;

  // Appliquer les filtres après le changement
  this.applyFilters();
}

// Méthode pour gérer la sélection des marques
onBrandChange(event: Event) {
  const checkbox = event.target as HTMLInputElement;
  const brand = checkbox.value;

  if (checkbox.checked) {
    this.selectedCategories.push(brand);
  } else {
    this.selectedCategories = this.selectedCategories.filter(b => b !== brand);
  }

  // Appliquer les filtres après le changement de marque
  this.applyFilters();
} 


// Méthode appelée lorsqu'on change les sliders

// Calcul de la position du début de la barre de progression
getProgressLeft(): number {
  return (this.minPrice - 4000) / (this.maxLimit - 4000) * 100;
}

// Calcul de la largeur de la barre de progression
getProgressWidth(): number {
  return (this.maxPrice - this.minPrice) / (this.maxLimit - 4000) * 100;
}
}
