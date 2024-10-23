import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Simple Angular App';
  message = 'Click the button to see a message';
  name: string = '';  // This is bound to the input field

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'fr', 'ar']);
    // Définir la langue par défaut
    translate.setDefaultLang('fr');
    
 // Détecter la langue du navigateur ou utiliser 'fr' par défaut si aucune langue supportée n'est trouvée
 const browserLang = translate.getBrowserLang() || 'fr';
 translate.use(browserLang.match(/en|fr|ar/) ? browserLang : 'fr');
  }
 
  // Méthode pour changer la langue
  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  sayHello() {
    this.message = 'Hello, World!';
  }
}
