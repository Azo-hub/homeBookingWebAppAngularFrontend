import { Component, OnInit } from '@angular/core';
import { PaymentMethod } from '../model/payment-method';

@Component({
  selector: 'app-billing-address',
  templateUrl: './billing-address.component.html',
  styleUrls: ['./billing-address.component.css']
})
export class BillingAddressComponent implements OnInit {

  paymentMethod: PaymentMethod = new PaymentMethod;

  constructor() { }

  ngOnInit(): void {
    this.loadBillingAddress();
  }

  loadBillingAddress():void {

  }

}
