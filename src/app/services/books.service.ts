import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Book } from '../models/book';
import { Subject } from 'rxjs/Subject';

const URL = 'http://localhost:3000/books';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  //books: Book[] = [];
  newBookSubject = new Subject<Book>();
  editBookSubject = new Subject<Book>();

  newBookStream = this.newBookSubject.asObservable();
  editBookStream = this.editBookSubject.asObservable();
  

  constructor(private http: HttpClient) { }

  emitBook(book: Book){
    this.newBookSubject.next(book);
  }

  emitUpdateBook(book: Book){
    this.editBookSubject.next(book);
  }

  getBooks(){
    return this.http.get<Book[]>(URL);
  }

  saveBook(book: Book){
    if(book.id==0){
      return this.http.post<Book>(URL, book);
    }else{
      return this.http.put<Book>(URL+'/'+book.id, book);
    }
  }

  getBook(id: number){
    return this.http.get<Book>(URL+'/'+id);
  }

  deleteBook(book: Book){
    return this.http.delete(URL+'/'+book.id);
  }

}
