import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Property } from '../model/property';
import { PropertyService } from '../service/property.service';

@Component({
  selector: 'app-find-spaces-that-suit-you-inner',
  templateUrl: './find-spaces-that-suit-you-inner.component.html',
  styleUrls: ['./find-spaces-that-suit-you-inner.component.css']
})
export class FindSpacesThatSuitYouInnerComponent implements OnInit, OnDestroy {
  
  allhousesType:string|null = "";
  private subscriptions: Subscription[] = [];
  properties : Property[] = [];
  
  

  constructor(private activatedRoute: ActivatedRoute, private propertyService:PropertyService) { }

  ngOnInit(): void {
    this.allhousesType = this.activatedRoute.snapshot.paramMap.get("category");
    console.log(this.allhousesType);
    this.getAllProperty();
  }
  
  
  getAllProperty():void {
    
    const formData = new FormData();
    formData.append("propertyType",this.allhousesType);
    this.subscriptions.push(
      
      this.propertyService.getProperties(formData).subscribe(
        (response: Property[]) => {
          //this.uService.addUsersToLocalCache(response);
          this.properties = response;
          
        },
        (errorResponse: HttpErrorResponse) => {
          //this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          
        }
      )
    );
    
  }
  
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  
  

}
