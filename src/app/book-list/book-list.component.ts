import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { Book } from '../models/book';
import { BooksService } from '../services/books.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';





@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  isAuth = false;
  mot = '';
  closeResult = ''; 
  books: Book[] = [];
  page = 1;
  pageSize=3;

  constructor(
    private http: HttpClient,
    private authService: AuthService, 
    private booksService: BooksService,
    config: NgbPaginationConfig
    ) {
      config.size = 'sm';
      config.boundaryLinks = true;
    }

  ngOnInit(): void {
    this.getBooks();
    this.booksService.newBookStream.subscribe(book => this.getBooks());
    this.isAuth=this.authService.isAuth();
    this.authService.authStream.subscribe(statut => {
      this.isAuth=this.authService.isAuth();
    });
  }

  getBooks(){
    this.booksService.getBooks().subscribe(
      data => {
        this.books = data;
      }
    );
  }

  doUpdate(book: Book){
    this.booksService.emitUpdateBook(book);
  }

  doView(book: Book){
    
  }


  doDelete(book: Book){
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer?',
      text: 'Cette opération est irréversible!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Quitter'
    }).then((result) => {
      if (result.isConfirmed) {
        this.booksService.deleteBook(book).subscribe(
          ()=>{
            this.getBooks();
            Swal.fire(
              'Supprimé!',
              'Opération effectuée avec succès.',
              'success'
            )
          },
          (error) => {
            Swal.fire(
              'Echec!',
              'Ce livre ne peut pas être supprimé.',
              'error'
            )
          });
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Suppression annulée',
          '',
          'error'
        )
      }
    })
    
  }

  ngOnDestroy(){
    this.booksService.newBookStream._subscribe;
    this.authService.authStream._subscribe;
  }


}
