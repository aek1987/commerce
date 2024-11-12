import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../service/payment.service';
import { Router } from '@angular/router';
import { Panier } from '../modeles/Panier.model';
import { CartService } from '../service/cart.service';
import { Commande } from '../modeles/commande';
import { OrderService } from '../service/order.service';
import Swal from 'sweetalert2';
import { WilayaService } from '../service/wilaya.servfice';


@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.css']
})
export class DeliveryFormComponent  implements OnInit{
  deliveryFee: number = 0; // Exemple de frais de livraison fixe
  items: Panier []=[];  // Obtenir les produits du panier
  total :number=0; // Calculer le total
  total_a_payer :number=0; // Calculer le total
  wilayas: any[] = [];
  selectedWilayaId: string = '';
  selectedCommunes: string[] = [];
  commandes: any[] = [];
 // Liste des communes filtrées en fonction de la wilaya sélectionnée
  deliveryInfos = {
    address: '',
    wilaya: '',
    commune: '',
    name:"",
    phone:""
  
  };
  cardDetails = {
    number: '',
    expiry: '',
    cvv: ''
  };

  
  ngOnInit(): void {
    // S'abonner aux changements des items
    this.cartService.items$.subscribe(items => {
      this.items = items;
      console.log('Panier mis à jour:', this.items);
    });
  
    // S'abonner aux changements du total
    this.cartService.total$.subscribe(total => {
      this.total = total;
      console.log('Total du panier mis à jour:', this.total);
    });
  
    // Charger les items du panier initialement
    this.items = this.cartService.getPanierItems();
    console.log('Panier initial après chargement:', this.items);

    // Charger les wilayas au démarrage du composant
    this.wilayaService.getWilayas().subscribe(
      (data) => {
        this.wilayas = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des wilayas', error);
      }
    );
  } 
 
  
  paymentMode: string = 'cash'; // Par défaut, paiement par carte
  constructor(private paymentService: PaymentService,private router: Router,private cartService: CartService ,private orderservice:OrderService ,
    private wilayaService: WilayaService
  ) {}
  
  
  onWilayaChange(event: any): void {
    const selectedWilaya = this.wilayas.find(wilaya => wilaya.nom === this.deliveryInfos.wilaya);
    
    if (selectedWilaya && selectedWilaya.communes) {
      this.selectedCommunes = selectedWilaya.communes; // Met à jour la liste des communes
    } else {
      this.selectedCommunes = []; // Si la wilaya n'est pas valide, vide la liste des communes
    }
  
    // Réinitialiser la commune si elle ne fait pas partie des communes disponibles
    if (!this.selectedCommunes.includes(this.deliveryInfos.commune)) {
      this.deliveryInfos.commune = ''; // Réinitialise la commune sélectionnée si elle n'est pas dans la nouvelle liste
    }
  
    // Ajouter les frais de livraison en fonction de la wilaya sélectionnée
    if (selectedWilaya && selectedWilaya.nom === 'Alger') {
      this.deliveryFee = 300; // Frais de livraison pour Alger
    } else {
      this.deliveryFee = 500; // Frais généraux ou différents pour d'autres wilayas
    }
  }
  
  
  onCommuneChange(event: Event) {
    this.deliveryInfos.commune = (event.target as HTMLSelectElement).value;
  }
 

  onSubmit() {
    // Soumettre les informations de livraison
    console.log('Informations de livraison:', this.deliveryInfos);
  }

  
  
   setPaymentMode(mode: string) {
    this.paymentMode = mode;
  }
  // Fonction pour gérer le changement de mode de paiement
  onPaymentModeChange(mode: string) {
    this.paymentMode = mode;
  }

// PassersCommande PassersCommande PassersCommande
  // PassersCommande PassersCommande PassersCommande
  PassersCommande() {
    if (this.paymentMode === 'card') {
      console.log('Paiement par carte confirmé', this.cardDetails);
    } else {
      console.log('Paiement à la livraison sélectionné');
    }

// Créer un objet commande
const commande: Commande = {
  name: this.deliveryInfos.name,
  phone: this.deliveryInfos.phone, 
  wilaya: this.deliveryInfos.wilaya,
  commune: this.deliveryInfos.commune,
  address: this.deliveryInfos.address,

  totalPrice: this.total + this.deliveryFee, 
  status: 'En cours',  
 
  orderDate:new Date().toLocaleString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Optional: Use 24-hour format
  }),
 
 // Créez  panier
 panier: this.items

};

console.log("la date de la commande "+commande.orderDate);

// Soumettre la commande via le service

this.orderservice.PasserCommande(commande).subscribe(
  response => {
    
      console.log('la reponde de passage de Commande  ', response);  
      if (response.commandestate==="succes") {

          console.log('Commande soumise avec succès', response);          
         // stocker les information de client 
          localStorage.setItem('clientPhone', this.deliveryInfos.phone);    
         
          this.showsuccess();
          this.clearCart() ;
         

      } else {
          console.error('Erreur lors de la soumission de la commande : reponse= '+response);    
          console.error(response);
        }
  },
  error => {
      console.error('Erreur lors de la soumission de la commande', error);
      // Afficher un message à l'utilisateur ici
  }
);





  }
  showsuccess(){
    // Vérifier si le panier est vide
  
    Swal.fire({
      icon: 'success',
      title: 'Commande prise en charge',
      text: 'Merci pour votre commande ! Votre commande a été validée avec succès et est en cours de traitement. Vous recevrez bientôt une confirmation par telephone.',
      confirmButtonText: 'Voir mes commandes',
  }).then((result) => {
      if (result.isConfirmed) {
          this.router.navigate(['/orders']); // Redirige vers la page des commandes
      }
  });
  
    
    
  }

  calculateTotal() {
    this.total = this.cartService.getTotal();
  }

  clearCart() {
   this.cartService.clearCart();
   this.calculateTotal();
   console.log('le panier apres vider '+ this.items);
   this.router.navigate(['/product']);
  }
// Lorsque l'utilisateur sélectionne une wilaya
onWilayaSelect(wilayaId: string): void {
  this.selectedWilayaId = wilayaId;

  // Charger les commandes pour cette wilaya
  this.wilayaService.getCommandesForWilaya(wilayaId).subscribe(
    (data) => {
      this.commandes = data;
    },
    (error) => {
      console.error('Erreur lors du chargement des commandes', error);
    }
  );
}

}
