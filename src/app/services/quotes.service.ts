import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

export interface Quote {
  id: string;
  text: string;
  source: string;
  category: string;
  subcategory: string;
  reference?: string;
  tags?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  private quotesSubject = new BehaviorSubject<Quote[]>([]);
  private currentPage = 1;
  private pageSize = 20;

  constructor(
    private http: HttpClient,
    private translate: TranslateService
  ) {
    this.loadQuotes();
  }

  private loadQuotes() {
    // Load quotes from JSON file based on current language
    const lang = this.translate.currentLang;
    this.http.get<Quote[]>(`assets/data/quotes-${lang}.json`)
      .subscribe(quotes => {
        this.quotesSubject.next(quotes);
      });
  }

  getQuotes(
    category?: string,
    subcategory?: string,
    searchTerm?: string,
    page: number = 1
  ): Observable<Quote[]> {
    this.currentPage = page;
    return new Observable(observer => {
      this.quotesSubject.subscribe(quotes => {
        let filtered = quotes;

        if (category) {
          filtered = filtered.filter(q => q.category === category);
        }

        if (subcategory) {
          filtered = filtered.filter(q => q.subcategory === subcategory);
        }

        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          filtered = filtered.filter(q =>
            q.text.toLowerCase().includes(term) ||
            q.source.toLowerCase().includes(term) ||
            (q.tags && q.tags.some(tag => tag.toLowerCase().includes(term)))
          );
        }

        const start = (page - 1) * this.pageSize;
        const paged = filtered.slice(start, start + this.pageSize);
        observer.next(paged);
      });
    });
  }
}
