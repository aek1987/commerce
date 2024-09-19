import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Simple Angular App';
  message = 'Click the button to see a message';
  name: string = '';  // This is bound to the input field

  sayHello() {
    this.message = 'Hello, World!';
  }
}
