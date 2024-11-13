import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Wilaya {
  id: string;
  code: string;
  nom: string;
}

interface Commune {
  id: string;
  nom: string;
  wilaya_id: string; // Corrected to match property name conventions
}

@Injectable({
  providedIn: 'root'
})
export class WilayaService {
  private wilayasJsonUrl = 'http://localhost:4200/assets/wilaya/wilayas.json';
  private communesJsonUrl = 'http://localhost:4200/assets/wilaya/communes.json';

  constructor(private http: HttpClient) { }

  // Récupérer la liste des wilayas
  getWilayas(): Observable<Wilaya[]> {
    return this.http.get<Wilaya[]>(this.wilayasJsonUrl);
  }

  getCommunesForWilaya(wilayaId: string): Observable<Commune[]> {
    return this.http.get<Commune[]>(this.communesJsonUrl).pipe(
      map((communes) => {
        // Affiche toutes les communes avant le filtrage
      //  console.log('Toutes les communes récupérées:', communes);
  
        // Filtrage des communes en fonction de l'ID de la wilaya
        const filteredCommunes = communes.filter(commune => commune.wilaya_id === wilayaId);
  
        // Affiche les communes filtrées
      //  console.log('Communes filtrées pour la wilaya ' + wilayaId + ':', filteredCommunes);
  
        return filteredCommunes;
      })
    );
  }
  
}
