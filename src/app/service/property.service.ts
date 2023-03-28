import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CheckInAndOutDate } from '../model/checkInAndOutDate';
import { CustomHttpResponse } from '../model/custom-http-response';
import { Property } from '../model/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  public host = environment.apiUrl;
  
  constructor(private http: HttpClient) { }
  
  newProperty(property: Property): Observable<HttpResponse<Property>> {
    return this.http.post<Property> 
    (`${this.host}/newProperty`, property, {observe: 'response'});
  }
  
  public getProperties(formData:FormData) : Observable<Property[]> {
    return this.http.post<Property[]>(`${this.host}/allPropertyByCategory`,formData);
  }
  
  getPropertyById(formData:FormData) : Observable<Property> {
    return this.http.post<Property>(`${this.host}/eachPropertyById`,formData);
  }
  
  checkPropertyAvailability(formData:FormData): Observable<CustomHttpResponse> {
       return this.http.post<CustomHttpResponse>
        (`${this.host}/checkPropertyAvailability`,formData);
  }

  checkDateAvailability(formData:FormData): Observable<CustomHttpResponse> {
    return this.http.post<CustomHttpResponse>
     (`${this.host}/checkDateAvailability`,formData);
  }
  
 
}
