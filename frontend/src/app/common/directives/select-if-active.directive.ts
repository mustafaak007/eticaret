import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[selectIfActive]',
  standalone: true,
})
export class SelectIfActiveDirective implements OnInit {
  @Input() selectIfActive: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (this.selectIfActive) {
      this.el.nativeElement.selected = true;
    }
  }
}
