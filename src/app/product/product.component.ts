import { Component } from '@angular/core';
import { CartService } from '../service/cart.service';  // Importer le service du panier
import { Product } from '../modeles/product.model';
import { faShoppingCart, faCartPlus } from '@fortawesome/free-solid-svg-icons'; // Importer les icônes
import { ProductsService } from '../service/products.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  // Liste des produits avec nom, prix et description
  products :Product[]=[]; 
  
  filteredProducts: Product[] = [];
  searchQuery: string = '';  showAll: boolean = false;   

  categories: string[] = ['All', 'Oppo', 'Redmi', 'realme','Apple', 'Samsung', 'Xiami']; // Liste des catégories
  selectedCategory: string = 'All'; // Catégorie sélectionnée

  faCartPlus = faCartPlus; // Déclarer l'icône dans la classe du composant
  notificationMessage: string | null = null;  // Message de notification
  notifiedProductId: number | null = null;  // ID du produit notifié

 
  minPrice: number = 0;  // Prix min par défaut
  maxPrice: number = 70000;  // Prix max par défaut
  progressBarWidth: number = 0; // Largeur de la barre de progression


  lastAvailableDate: string | null = null;  
  selectedColor: string | null = null;
  selectedCategories: string[] = [];
  isHoveredProduct: string | null = null; // ID du produit actuellement survolé
  isHovered: boolean = false; // Ajoute une variable pour gérer l'état du curseur
 
  // Tableau des produits dans le panier
  cart: Product[] = [];
  constructor(private cartService: CartService,private productService: ProductsService,private toastr: ToastrService, private router: Router)
    {}

    ngOnInit() {
    
      this.productService.getProducts().subscribe((data: Product[]) => {
        this.products = data;  // Assign the fetched products to the component
        this.filteredProducts = this.products;
      });
       // Initially, show all products
    
  }
  // Méthode pour ajouter un produit au panier
  addToCart(product: Product,event: MouseEvent) {
    console.log('Produit clique:', product);
    event.stopPropagation(); // Empêche le clic du bouton de déclencher le clic de la carte
    this.cartService.addProduct(product);

   // Position du toast basée sur la position du bouton
  

   // Obtenir les coordonnées du bouton cliqué
  const buttonElement = event.target as HTMLElement;
  const rect = buttonElement.getBoundingClientRect();
  const position = {
    top: rect.top + window.scrollY +50+'px',  // Ajuste la position verticale pour être juste au-dessus du bouton
    left: rect.left + window.scrollX + 'px'      // Position horizontale du bouton
  };
  this.toastr.clear();
  // Définir la position du toast en fonction de l'emplacement du bouton
  this.toastr.success('Succès Produit ajouté au panier!', '', {
    positionClass: 'toast-custom-position',
    enableHtml: true,
    tapToDismiss: true,
    timeOut: 2000,  // Durée d'affichage du toast
  //  toastClass: `ngx-toastr toast-custom-position`,
    onActivateTick: true,
    toastClass: `ngx-toastr toast-success`,
  });
// Ajouter un style personnalisé au toast
// Ajouter un style personnalisé au toast après un court délai
setTimeout(() => {
  const toastElement = document.querySelector('.toast-custom-position') as HTMLElement;
  if (toastElement) {
    toastElement.style.position = 'absolute';
    toastElement.style.top = position.top;
    toastElement.style.left = position.left;
    toastElement.style.textDecorationColor= 'green'; // Appliquez le vert directement
    toastElement.style.color = 'green'; // Texte en blanc
  }
}, 0); // Le délai de 0 ms permet d'attendre que le toast soit rendu

 console.log('Message de Toastr devrait apparaître ici');
    
  }
   // Méthode pour calculer le total du panier
   calculateTotal(): number {
    return this.cart.reduce((total, product) => total + product.price, 0);
  }

  searchProducts() {
    if (this.searchQuery) {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products; // If search query is empty, show all products
    }
  }
  // Méthode pour filtrer les produits en fonction de la catégorie
  filterByCategory(event: Event) {
  
    
    const selectElement = event.target as HTMLSelectElement;
    const selectedCategory = selectElement.value;
    if (selectedCategory === 'All') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.category === selectedCategory);
    }
  }
  goToProductDetail(product :Product ){
    this.router.navigate(['/product', product.id]);
  }

  // Dans votre composant TypeScript
colors = ['Rouge', 'Vert', 'Bleu', 'Jaune', 'Noir', 'Blanc']; // Exemple de couleurs

filterByColor(event: Event) {
  const selectedColor = (event.target as HTMLSelectElement).value;
  // Implémentez votre logique de filtrage ici
}
// Méthode pour filtrer par prix
filterByPrice() {
  this.filteredProducts = this.filteredProducts.filter(product => 
    product.price >= this.minPrice && product.price <= this.maxPrice
  );
}
//Méthode pour filtrer par évaluation
filterByEvaluation(rating: number): void {
 // this.filteredProducts = this.products.filter(product => product.evaluation === rating);
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
  this.applyCategoryFilter();
}
dropdownOpen: boolean = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
applyCategoryFilter() {
  
  if (this.selectedCategories.length === 0 || this.selectedCategories.includes('All')) {
    // Si aucune catégorie n'est sélectionnée, afficher tous les produits
    this.filteredProducts = this.products;
  } else {
    // Filtrer les produits pour qu'ils appartiennent à l'une des catégories sélectionnées
    this.filteredProducts = this.products.filter(product =>
      this.selectedCategories.includes(product.category)
    );
  }
}
  // Méthode pour gérer les changements de filtre
  onPriceFilterChange(event: any) {
    const priceLimit = Number(event.target.id.split('-').pop()); // Obtenir la limite de prix depuis l'ID
    const isChecked = event.target.checked;

    if (isChecked) {
      // Filtrer les produits en fonction de la case cochée
      this.filteredProducts = this.products.filter(product => product.price < priceLimit);
    } else {
      // Réinitialiser les produits filtrés si aucune case n'est cochée
      this.filteredProducts = [...this.products];
     // this.updateFilteredProducts();
    }
  }
updateProgressBar() {
  // Met à jour la largeur de la barre de progression
  const totalRange = 1000; // Plage de prix totale (à adapter)
  this.progressBarWidth = ((this.minPrice + this.maxPrice) / totalRange) * 100;
}

onMinPriceChange(event: Event) {
  const input = event.target as HTMLInputElement;
  this.minPrice = Number(input.value);
  this.updateProgressBar();
  this.filterByPrice();
}

onMaxPriceChange(event: Event) {
  const input = event.target as HTMLInputElement;
  this.maxPrice = Number(input.value);
  this.updateProgressBar();
 this.filterByPrice();
}

}
