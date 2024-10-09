import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  public alertMessage: string | null = null; // Propriété pour stocker le message
  
  constructor(private toastr: ToastrService) {}

  success(message: string, title?: string) {
    this.alertMessage = message; // Stocker le message
    this.toastr.success(message, title);
  }

  error(message: string, title?: string) {
    this.alertMessage = message;
    this.toastr.error(message, title);
  }

  warning(message: string, title?: string) {
    this.alertMessage = message;
    this.toastr.warning(message, title);
  }

  info(message: string, title?: string) {
    this.alertMessage = message;
    this.toastr.info(message, title);
  }

  clearAlert() {
    this.alertMessage = null; // Réinitialiser le message
  }
}
