import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  newContact: { name: string, email: string } = { name: '', email: '' }; // Stocke les informations du contact
  contacts: { name: string, email: string }[] = []; // Liste des contacts

  // Ajouter un contact à la liste
  addContact() {
    if (this.newContact.name && this.newContact.email) {
      this.contacts.push({ ...this.newContact });
      this.newContact = { name: '', email: '' }; // Réinitialiser le formulaire
    }
  }

  // Supprimer un contact de la liste
  deleteContact(index: number) {
    this.contacts.splice(index, 1);
  }
}
