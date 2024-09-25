import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Product } from '../modeles/product.model';  // Assurez-vous que vous avez une interface Product

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);

    // Nettoyer le Local Storage avant chaque test
    localStorage.clear();
  });

  it('devrait ajouter un produit au panier', () => {
    const product: Product = {  name: 'Produit 1', price: 100, description: '', image: '' };
    service.addProduct(product);
    
    const items = service.getItems();
    expect(items.length).toBe(1);  // Vérifier qu'un article a été ajouté
    expect(items[0].name).toBe('Produit 1');  // Vérifier que c'est le bon produit
  });

  it('devrait calculer correctement le total', () => {
    const product1: Product = {  name: 'Produit 1', price: 100, description: '', image: '' };
    const product2: Product = { name: 'Produit 2', price: 200, description: '', image: '' };
    
    service.addProduct(product1);
    service.addProduct(product2);
    
    const total = service.getTotal();
    expect(total).toBe(300);  // Le total devrait être 300€
  });

  it('devrait vider le panier', () => {
    const product: Product = {name: 'Produit 1', price: 100, description: '', image: '' };
    service.addProduct(product);

    service.clearCart();
    const items = service.getItems();
    expect(items.length).toBe(0);  // Vérifier que le panier est vide
  });

  it('devrait persister le panier dans le Local Storage', () => {
    const product: Product = {  name: 'Produit 1', price: 100, description: '', image: '' };
    service.addProduct(product);

    // Vérifier si le Local Storage contient les produits après ajout
    const savedCart = localStorage.getItem('cart');
    expect(savedCart).toBeTruthy();  // Vérifier que le panier est bien sauvegardé

    const items = JSON.parse(savedCart as string);
    expect(items.length).toBe(1);  // Vérifier qu'il y a un produit sauvegardé
    expect(items[0].name).toBe('Produit 1');  // Vérifier le nom du produit
  });
});
