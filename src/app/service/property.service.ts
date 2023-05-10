import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CheckInAndOutDate } from '../model/checkInAndOutDate';
import { CustomHttpResponse } from '../model/custom-http-response';
import { Property } from '../model/property';
import { Review } from '../model/review';

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

  editProperty(formData: FormData): Observable<HttpResponse<Property>> {
    return this.http.post<Property> 
    (`${this.host}/editProperty`, formData, {observe: 'response'});
  }
  
  public getProperties(formData:FormData) : Observable<Property[]> {
    return this.http.post<Property[]>(`${this.host}/allPropertyByCategory`,formData);
  }

  getAllProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.host}/allProperty`);
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

  getPropertiesByOwner(formData:FormData) : Observable<Property[]> {
    return this.http.post<Property[]>(`${this.host}/allPropertyByOwner`,formData);
  }

  deleteProperty(formData: FormData): Observable<CustomHttpResponse> {
    return this.http.post<CustomHttpResponse>(`${this.host}/deleteProperty`,formData);
  }

  addReview(formData: FormData): Observable<CustomHttpResponse> {
    return this.http.post<CustomHttpResponse>(`${this.host}/addReview`,formData);
  }
  
  addCheckInCheckOutDates(formData: FormData): Observable<CustomHttpResponse> {
    return this.http.post<CustomHttpResponse>(`${this.host}/addDates`,formData);
  }

  getReviewsByProperty(formData: FormData): Observable<Review[]> {
    return this.http.post<Review[]>(`${this.host}/reviewByProperty`, formData);

  }

  public addPropertiesToLocalCache(properties: Property[]): void {
    localStorage.setItem('properties', JSON.stringify(properties));
  }

  public addPropertiesToLocalCacheAdmin(properties: Property[]): void {
    localStorage.setItem('Allproperties', JSON.stringify(properties));
  }
  
  
  public getPropertiesFromLocalCache(): Property[] {
    if(localStorage.getItem('properties')) {
      
      return JSON.parse(localStorage.getItem('properties') || '');
      
    }
    
    return [];
    
  }

  public getPropertiesFromLocalCacheAdmin(): Property[] {
    if(localStorage.getItem('Allproperties')) {
      
      return JSON.parse(localStorage.getItem('Allproperties') || '');
      
    }
    
    return [];
    
  }
  
 


}
