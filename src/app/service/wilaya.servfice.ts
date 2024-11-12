import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Wilaya {
  id: string;
  code: string;
  nom: string;
}

interface Commande {
  id: string;
  produit: string;
  quantite: number;
  prix: number;
}

interface CommandeWilaya {
  wilayaId: string;
  commandes: Commande[];
}

@Injectable({
  providedIn: 'root'
})
export class WilayaService {

    private wilayasJsonUrl = 'http://localhost:4200/assets/wilaya/wilayas.json';

  private commandesJsonUrl = 'http://localhost:4200/assets/wilaya/communes.json'; // Chemin vers le fichier commandes

  constructor(private http: HttpClient) { }

  // Récupérer la liste des wilayas
  getWilayas(): Observable<Wilaya[]> {
    return this.http.get<Wilaya[]>(this.wilayasJsonUrl);
  }

  // Récupérer les commandes pour une wilaya donnée
  getCommandesForWilaya(wilayaId: string): Observable<Commande[]> {
    return this.http.get<CommandeWilaya[]>(this.commandesJsonUrl).pipe(
      map((data) => {
        // Spécifier explicitement le type pour `wilaya`
        const wilayaCommandes = data.find((wilaya: CommandeWilaya) => wilaya.wilayaId === wilayaId);
        return wilayaCommandes ? wilayaCommandes.commandes : [];
      })
    );
  } 
}
