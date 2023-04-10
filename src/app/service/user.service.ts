import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { CustomHttpResponse } from '../model/custom-http-response';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host = environment.apiUrl;
  private onDelete = new User;
  

  constructor(private http: HttpClient) { }
  
  public getUsers() : Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/allUser`);
  }
  
  
  public addUser(formData: FormData) : Observable<User> {
    return this.http.post<User>(`${this.host}/newUser`, formData);
  } 


  
  public newUserFromEmail(formData: FormData) : Observable<User | HttpErrorResponse> {
    return this.http.get<User>(`${this.host}/newUser`);
  }
  
  public updateUser(formData: FormData) : Observable<User> {
    return this.http.post<User>(`${this.host}/updateUserInfo`, formData);
  }
  
  public updateUserBySelf(formData: FormData) : Observable<User> {
    return this.http.post<User>(`${this.host}/updateUserInfoBySelf`, formData);
  }
  
  public resetPassword(formData: FormData) : Observable<CustomHttpResponse> {
    return this.http.post<CustomHttpResponse>(`${this.host}/forgetPassword`,formData);
  }
  
  public updateProfileImage(formData:FormData): Observable<HttpEvent<User> | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/updateProfileImage`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
  
  public deleteUser(onDeleteUser: User): Observable<CustomHttpResponse> {
    console.log(onDeleteUser);
    return this.http.post<CustomHttpResponse>(`${this.host}/deleteUser`,onDeleteUser);
  }

  verify(formData: FormData): Observable<CustomHttpResponse> {
    return this.http.post<CustomHttpResponse>(`${this.host}/verifyAcct`,formData);
  }

  getUserByUsername(formData: FormData):Observable<User> {
    return this.http.post<User>(`${this.host}/getUserByUsername`, formData);
  
  }

  contactSupport(formData: FormData): Observable<CustomHttpResponse> {
    return this.http.post<CustomHttpResponse>(`${this.host}/support`,formData);
  }

  
  public addUsersToLocalCache(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }
  
  
  public getUsersFromLocalCache(): User[] {
    if(localStorage.getItem('users')) {
      
      return JSON.parse(localStorage.getItem('users') || '');
      
    }
    
    return [];
    
  }


      
  public createUserFormData(loggedInUsername: string, user: User , profileImage: File):FormData {
    
    const formData = new FormData();
    formData.append("currentUsername", loggedInUsername);
    formData.append("firstName", user.firstname);
    formData.append("lastName", user.lastname);
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("role", user.role);
    formData.append("phone", user.phone);
    /*formData.append("profileImage", profileImage);*/
    formData.append("accountEnabled", JSON.stringify(user.accountEnabled));
    formData.append("accountNonLocked", JSON.stringify(user.accountNonLocked));
    
  return formData;
  
  }
  
  
  public updateUserProfileBySelfFormData(loggedInUsername: string, user: User , currentPassword: string,
                                  newPassword: string, confirmPassword: string):FormData {
    
    const formData = new FormData();
    formData.append("currentUsername", loggedInUsername);
    formData.append("firstName", user.firstname);
    formData.append("lastName", user.lastname);
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("role", user.role);
    formData.append("phone", user.phone);
    formData.append("gender", user.gender);
    formData.append("dateOfBirth", user.dateOfBirth.toString());
    formData.append("currentPassword", currentPassword);
    formData.append("newPassword", newPassword);
    formData.append("confirmPassword", confirmPassword);
    
  return formData;
  
  }

  

  

}
