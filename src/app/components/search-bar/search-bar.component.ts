import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: false
})
export class SearchBarComponent {
  @Output() searchChange = new EventEmitter<string>();

  constructor(private translate: TranslateService) {}

  onInput(event: any) {
    this.searchChange.emit(event.target.value);
  }
}
