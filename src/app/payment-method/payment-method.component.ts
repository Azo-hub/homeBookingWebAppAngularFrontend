import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit, OnDestroy {

  showLoading: boolean = false;

  constructor() { }
  
  ngOnInit(): void {

  }

  onAddCreditCardInfo(): void {
    this.showLoading = true;

  }

  ngOnDestroy(): void {
    
  }


}
