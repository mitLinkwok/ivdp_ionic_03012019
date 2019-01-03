import { Directive, Input, HostListener, ElementRef } from "@angular/core";

/**
 * Generated class for the AutoresizeDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: 'ion-textarea[autoresize]' // Attribute selector
})
export class AutoresizeDirective {
  
  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }

  @Input('autoresize') maxHeight: number;

  constructor(public element: ElementRef) {
  }

  ngOnInit(): void {
    this.adjust();
  }

  ngAfterViewInit() {
    this.adjust();
  }

  adjust(): void {
    setTimeout(() => {
      let ta = this.element.nativeElement.querySelector("textarea"),
        newHeight;
      if (ta) {
        ta.style.overflow = "hidden";
        ta.style.height = "auto";
        if (this.maxHeight) {
          console.log('this.maxHeight', this.maxHeight)
          newHeight = Math.min(ta.scrollHeight, this.maxHeight);
          console.log('newHeight', newHeight)
        } else {
          newHeight = ta.scrollHeight;
        }
        ta.style.height = newHeight + "px";
      }  
    }, 500);
  }
}