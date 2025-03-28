// drop-down.component.ts
import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class DropDownComponent {
  @Input() items: string[] = [];
  @Input() placeholder: string = 'Selecione uma opção';
  @Input() selectedItem: string = '';
  @Input() width: string = '223';
  @Input() height: string = '40';

  @Output() itemSelected = new EventEmitter<string>();

  isOpen = false;

  constructor(private elementRef: ElementRef) {}

  // Toggle dropdown visibility
  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
    console.log('Toggle dropdown:', this.isOpen, this.items);
  }

  // Handle item selection
  selectItem(item: string, event: Event): void {
    event.stopPropagation();
    this.selectedItem = item;
    this.itemSelected.emit(item);
    this.isOpen = false;
    console.log('Item selected:', item);
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      if (this.isOpen) {
        this.isOpen = false;
        console.log('Closing dropdown from outside click');
      }
    }
  }
}
