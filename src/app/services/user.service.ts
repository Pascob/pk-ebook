import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Subject } from 'rxjs-compat/Subject';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  userSubject = new Subject<User[]>();
  
  // constructor() { }

  emitUsers(){
    this.userSubject.next(this.users.slice());
  }

  addUser(user: User) {
    this.users.push(user);
    this.emitUsers();
  }
}
