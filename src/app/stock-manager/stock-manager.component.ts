import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { newProduct, Product } from '../modeles/product.model';
import { AlertService } from '../service/alerte-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-manager',
  templateUrl: './stock-manager.component.html',
  styleUrls: ['./stock-manager.component.css']
})
export class StcoktManagerComponent implements OnInit {
  products: Product[] = [];
  newProduct : newProduct={
    id:0,
    name: '',
    price: 0,
    description: '',
    image: '',
    category: '',
    resolution: '',
    storage: '',
    ram: '',
    battery: '',
    wirelessCharging: '',
    color: '',
    dualSim: false

  }
  imagePreview: string | ArrayBuffer | null = null;
  constructor(private productService: ProductsService,private toast: AlertService,private router: Router)     
   {}

  ngOnInit(){
    this.productService.getProducts().subscribe((data: Product[]) => {
    this.products = data;  // Assign the fetched products to the component
   
    });
  }

  addProduct() {
    if (this.newProduct.image) {
      // Ajouter le produit avec l'image
      this.newProduct.id=this.products.length+1;
      this.productService.addProduct(this.newProduct).subscribe(
        (newProduct) => {
          this.products.push(newProduct);
          this.toast.success('Produit ajouté avec succès');
          // Réinitialiser le formulaire après l'ajout
         this.newProduct = { name: '',
          id:0,
          price: 0,
          description: '',
          image: '',
          category: '',
          resolution: '',
          storage: '',
          ram: '',
          battery: '',
          wirelessCharging: '',
          color: '',
          dualSim: false };
         // this.imagePreview = null;
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du produit', error);
        }
      );
    } else {
      this.toast.error('Veuillez sélectionner une image pour le produit');
    }
  }
  

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter(product => product.id !== id);
        this.toast.success('Produit supprimé avec succès');
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du produit', error);
    //    this.toast.onToastMessage('Impossible de supprimer le produit', { duration: 3000 });
      }
    });
  }
  
  



  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // Créer une URL d'image temporaire
        const imageName = `assets/${file.name}`;
        this.newProduct.image = imageName;
      };
      reader.readAsDataURL(file);
    } else {
      this.imagePreview = null;
      this.toast.error('Veuillez sélectionner un fichier image valide');
    }
  }
  
}
