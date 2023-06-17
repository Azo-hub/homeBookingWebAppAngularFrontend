import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-new-payment-method',
  templateUrl: './add-new-payment-method.component.html',
  styleUrls: ['./add-new-payment-method.component.css']
})
export class AddNewPaymentMethodComponent implements OnInit {

  showPaymentMethodSection: boolean;
  showBillingSection: boolean;

  constructor() { }

  ngOnInit(): void {
  }
  

}
