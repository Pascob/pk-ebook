import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

const url = 'http://localhost:3000/users';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authSubject = new Subject<Boolean>();

  authStream = this.authSubject.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  saveUser(user: User): Observable<User>{
    return this.http.post<User>(url, user); //{"id":10, "username": user.username, "password": user.password}
  }

  signUser(username: string, password: string): Observable<User[]>{
    return this.http.get<User[]>(url+'?username='+username+'&password='+password);
  }

  userToSession(user: User): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public getUser(): User {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return new User(0, '', '');
  }


  isAuth(){
    return true === (this.getUser().id>0)
  }

  emitAuth(statut: Boolean){
    this.authSubject.next(statut);
  }
}
