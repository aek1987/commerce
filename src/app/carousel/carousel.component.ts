import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  items: string[] = [
    'assets/phone1.jpg', 
    'assets/phone2.jpg', 
    'assets/phone3.jpg'
  ]; // Liste d'URLs d'images Liste d'URLs d'imag]
  currentIndex: number = 0;

  ngOnInit(): void {
    if (this.items.length) {
      this.startAutoSlide();
    }
  }

  startAutoSlide() {
    setInterval(() => {
      this.next();
    }, 3000); // Change d'image toutes les 3 secondes
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
  }
}
