import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [IonicModule, TranslateModule, CommonModule, FormsModule ],
})
export class HomeComponent {
  categories = ['PROPHET', 'ABUBAKR', 'UMAR', 'UTHMAN', 'ALI'];
  selectedCategory: string = 'PROPHET';
  searchQuery: string = '';
  favorites: Set<string> = new Set();
  constructor() { }

  segmentChanged(event: any) {
    this.selectedCategory = event.detail.value;
  }

  getQuoteKeys(category: string): string[] {
    return Array.from({length: 5}, (_, i) => `QUOTE${i + 1}`);
  }

  onSearchChange(query: string) {
    this.searchQuery = query;
  }

  toggleFavorite(quoteKey: string) {
    const fullKey = `QUOTES.${this.selectedCategory}.${quoteKey}`;
    if (this.favorites.has(fullKey)) {
      this.favorites.delete(fullKey);
    } else {
      this.favorites.add(fullKey);
    }
    localStorage.setItem('favoriteQuotes', JSON.stringify([...this.favorites]));
  }

  isFavorite(quoteKey: string): boolean {
    return this.favorites.has(`QUOTES.${this.selectedCategory}.${quoteKey}`);
  }
}
