import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { newProduct, Product } from '../modeles/product.model';
import { AlertService } from '../service/alerte-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    ecran: '',
    processor: '',
    os: '',
    storage: '',
    ram: '',
    battery: '',
    wirelessCharging: '',
    color: '',
    dualSim: false

  }
  imagePreview: string | ArrayBuffer | null = null;
  storageOptions: number[] = [64,128,266];
  ramOptions: number[] = [4, 8, 16];
  batteryOptions: number[] = [2000, 3000, 4000, 5000, 6000];
  categories: string[] = ['Oppo', 'Redmi', 'ITEL', 'Samsung', 'Apple', 'Huawei', 'Xiaomi', 'Infinix'];
  resolutions: { value: string; label: string }[] = [
    { value: '1280 x 720', label: 'HD (1280 x 720)' },
    { value: '1600 x 900', label: 'HD+ (1600 x 900)' },
    { value: '1920 x 1080', label: 'Full HD (1920 x 1080)' },
    { value: '2280 x 1080', label: 'Full HD+ (2280 x 1080)' },
    { value: '2560 x 1440', label: '2K (2560 x 1440)' },
    { value: '3200 x 1800', label: 'QHD (3200 x 1800)' },
    { value: '3840 x 2160', label: '4K UHD (3840 x 2160)' },
  ];
  colorOptions: string[] = ['Rouge', 'Vert', 'Bleu', 'Jaune', 'Noir', 'Blanc', 'Gris', 'Rose'];
  isOtherColor: boolean = false;
  isCustomResolution: boolean = false;
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
          this.showsuccess();
          console.log('ajout un produit en cours ', this.newProduct );
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
  showsuccess(){
      Swal.fire({
      icon: 'success',
      title: ' ajouter un produit',
      text: 'veilleiz consulter la la liste des produits',
      confirmButtonText: 'Voir la liste des produit',
  })
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
  
  

  

  checkCustomResolution(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.isCustomResolution = selectedValue === 'other';
    if (!this.isCustomResolution) {
      this.newProduct.ecran = selectedValue; // Set the selected value if not custom
    } else {
      this.newProduct.ecran = ''; // Clear if custom input is selected
    }
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
  onColorChange(event: any) {
    this.isOtherColor = event.target.value === 'other';
  }
}
