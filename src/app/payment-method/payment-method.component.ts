import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit, OnDestroy {

  showLoading: boolean = false;
  showBilling: boolean;
  @Output()
  showBillingBtnPressed: EventEmitter<boolean> = new EventEmitter<boolean>(); 

  constructor() { }
  
  ngOnInit(): void {

  }

  onShowBillingBtnPressed() : void {
    
  }  

  onAddCreditCardInfo(): void {
    this.showLoading = true;

  }

  ngOnDestroy(): void {
    
  }


}
