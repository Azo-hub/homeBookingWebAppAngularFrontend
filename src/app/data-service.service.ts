import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor() { }
  
  dataEmitter = new EventEmitter<string>();
  
  raiseDataEmitterEvent(data: string) {
    this.dataEmitter.emit(data);
  }
}
