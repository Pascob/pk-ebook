import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBookDirective]'
})
export class BookDirectiveDirective {

  constructor(private el: ElementRef) { 
    //this.setBorder("blue");
  }

  private setBorder(color: string){
    let border = 'solid 4px ' + color;
    //this.el.nativeElement
  }

}
