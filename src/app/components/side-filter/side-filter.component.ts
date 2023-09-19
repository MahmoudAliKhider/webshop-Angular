import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrls: ['./side-filter.component.scss']
})
export class SideFilterComponent {
  @Output() sortSelected = new EventEmitter<string>();

  applySort(sortOption: string) {
    this.sortSelected.emit(sortOption);
  }

}
