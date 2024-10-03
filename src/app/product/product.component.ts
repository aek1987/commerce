import { Component } from '@angular/core';
import { CartService } from '../service/cart.service';  // Importer le service du panier
import { Product } from '../modeles/product.model';
import { faShoppingCart, faCartPlus } from '@fortawesome/free-solid-svg-icons'; // Importer les icônes
import { ProductsService } from '../service/products.service';
import { ToastrService } from 'ngx-toastr';

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

  categories: string[] = ['All', 'Phones', 'Laptops', 'Accessories']; // Liste des catégories
  selectedCategory: string = 'All'; // Catégorie sélectionnée

  faCartPlus = faCartPlus; // Déclarer l'icône dans la classe du composant
  notificationMessage: string | null = null;  // Message de notification
  notifiedProductId: number | null = null;  // ID du produit notifié
  ngOnInit() {
    
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;  // Assign the fetched products to the component
      this.filteredProducts = this.products;
    });
     // Initially, show all products
  
}
  // Tableau des produits dans le panier
  cart: Product[] = [];
  constructor(private cartService: CartService,private productService: ProductsService,private toastr: ToastrService)
    {}

  // Méthode pour ajouter un produit au panier
  addToCart(product: Product,event: MouseEvent) {
    console.log('Produit clique:', product);
    
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

}
