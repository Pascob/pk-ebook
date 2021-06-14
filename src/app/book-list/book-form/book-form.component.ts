import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../../models/book';
import { HttpClient } from '@angular/common/http';
import { BooksService } from '../../services/books.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class BookFormComponent implements OnInit {
  book: Book = new Book('', '');

  constructor(
    private http: HttpClient,
    private booksService: BooksService,
    config: NgbModalConfig, 
    private modalService: NgbModal
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.booksService.editBookStream.subscribe(
      book => {
        this.book = book;
      }
    )
  }

  open(content: any) {
    console.log(content);
    this.modalService.open(content);
  }

  saveBook(){
    this.booksService.saveBook(this.book).subscribe(
      book => this.booksService.emitBook(book),
      error => console.log("Erreur")
    );
  }

  ngOnDestroy(){
    this.booksService.editBookStream._subscribe;
  }

}
