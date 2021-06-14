import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../models/book';

@Pipe({
  name: 'searchBook'
})
export class SearchBookPipe implements PipeTransform {

  transform(books: Book[], search: string): Book[] {
    if(!books){
      return [];
    }

    if(!search){
      return books;
    }

    search = search.toLowerCase();

    return books.filter(book =>
      book.title.toLowerCase().includes(search)
    );
  }

}
