import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[pkBookDirective]'
})
export class BookDirectiveDirective {
  initialColor: string = 'white';
  initialBorder: string = 'solid 5px';
  initialHeight: number = 325;
  constructor(private el: ElementRef, private render2: Renderer2) {
    this.setBorder(this.initialColor);
    this.setHeight(this.initialHeight);
  }

  @Input('pkBookDirective') borderColor: string = 'azure';

  @HostListener('mouseenter') onMouseEnter(){
    this.setBorder(this.borderColor);
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.setBorder(this.initialColor);
  }

  private setBorder(color: string){
    let border = this.initialBorder + ' ' + color;
    this.render2.setStyle(this.el.nativeElement, 'border-left', border);
  }

  private  setHeight(height: number){
    this.render2.setStyle(this.el.nativeElement, 'height', height+'px');
  }

}
