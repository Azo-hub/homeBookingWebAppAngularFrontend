import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Role } from '../enum/role.enum';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public host = environment.apiUrl;
  
  private token:string = "";
  private loggedInUsername:string = "";
  private jwtHelper = new JwtHelperService();
  
  constructor(private http: HttpClient) { }
  
  public login(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>
    (`${this.host}/login`, user, {observe: 'response'});
  }
  
  newUser(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User> 
    (`${this.host}/newUser`, user, {observe: 'response'});
  }
  
  logOut(): void {
    
    this.token = "";
    this.loggedInUsername = "";
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
    
  }
  
  
  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }
  
  public addUserToLocalCache(user: User | null): void {
    localStorage.setItem('user', JSON.stringify(user));
  }
  
  public getUserFromLocalCache(): User {
    
    return JSON.parse(localStorage.getItem('user') || "");
  }
  
  
  public loadToken():void {
    this.token  = localStorage.getItem('token') || "";
  } 
  
  
  public getToken(): string {
    return this.token;
  }
  
  public isUserLoggedIn():any {
    this.loadToken();
    if(this.token != null && this.token !== ''){
      
      if(this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if(!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
      
    } else {
      this.logOut();
      return false;
    }
    
  }


  public get isAdmin(): boolean {
    return this.getUserRole() === Role.ADMIN;
  }
  
  public get isOwner(): boolean {
    return this.getUserRole() === Role.OWNER;
  }

  public get isTraveller(): boolean {
    return this.getUserRole() === Role.TRAVELLER;
  }

  public get isAuthenticated(): boolean {
    
    return this.getUserFromLocalCache() === JSON.parse(localStorage.getItem('user') || "");
    
  }
  
  
  private getUserRole(): string {
    return this.getUserFromLocalCache().role;
  }
  

}
