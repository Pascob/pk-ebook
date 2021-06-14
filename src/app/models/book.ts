export class Book {
    id: number = 0;
    photo: string = '';
    synopsis: string ='';
    constructor(public title: string, public author: string) {
    }
}
