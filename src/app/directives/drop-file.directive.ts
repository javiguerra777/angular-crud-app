import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDropFile]'
})
export class DropFileDirective {
  @Output() private filesChangeEmitter: EventEmitter<File[]>= new EventEmitter();

  @HostBinding('style.background') private background = '#eee';

  constructor() { }

  @HostListener('dragover', ['$event']) public onDragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
    this.background = 'lightgray'
    console.log('dragOver');
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();
    this.background = '#eee';
    console.log('drag Leave');
  }

  @HostListener('drop', ['$event']) public onDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    this.background = '#eee';
    let file = e.dataTransfer.files;
    if(file) {
      this.filesChangeEmitter.emit(file[0]);
    }
  }

}
