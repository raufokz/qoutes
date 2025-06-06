import { Component, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { TranslateService } from '@ngx-translate/core';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';
import { QuotesService, Quote } from '../services/quotes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: false,

})
export class HomePage {


  categories = ['PROPHET', 'ABUBAKR', 'UMAR', 'UTHMAN', 'ALI'];
  selectedCategory: string = 'PROPHET';
  searchQuery: string = '';
  favorites: Set<string> = new Set();

  constructor() {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favoriteQuotes');
    if (savedFavorites) {
      this.favorites = new Set(JSON.parse(savedFavorites));
    }
  }

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
