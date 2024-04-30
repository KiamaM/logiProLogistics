import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { newUser } from '../Interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  registerUser(newUser:newUser){
    return this.http.post<{message:string, error:string}>('http://localhost:4500/users/register', newUser)
  }
}
