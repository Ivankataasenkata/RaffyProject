import { Component, inject } from '@angular/core';
import { SuccessService } from '../../../core/services/success.service';

@Component({
  selector: 'app-success-notification',
  imports: [],
  templateUrl: './success-notification.html',
  styleUrl: './success-notification.css'
})
export class SuccessNotification {
   private successService = inject(SuccessService);

  readonly success = this.successService.success;
}
