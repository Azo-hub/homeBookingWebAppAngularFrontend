import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-new-payment-method',
  templateUrl: './add-new-payment-method.component.html',
  styleUrls: ['./add-new-payment-method.component.css']
})
export class AddNewPaymentMethodComponent implements OnInit {

  showPaymentMethodSection: boolean;
  
  showBillingSection: boolean;

  paymentMethodId: number;

  constructor() { }

  ngOnInit(): void {
  }

  onshowBillingFromChild(data: boolean): void {
    this.showPaymentMethodSection=false;
    this.showBillingSection = data;
    console.log(this.showBillingSection);
  }

  onPaymentCardIdFromChild(data: number): void {
    this.paymentMethodId = data;
  }

}
