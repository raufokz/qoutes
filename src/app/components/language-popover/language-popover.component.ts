import { Component } from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-popover',
  template: `
    <ion-list>
      <ion-item button (click)="selectLanguage('en')">
        <ion-icon name="language-outline" slot="start"></ion-icon>
        <ion-label>English</ion-label>
        <ion-icon *ngIf="selected === 'en'" name="checkmark" slot="end"></ion-icon>
      </ion-item>
      <ion-item button (click)="selectLanguage('ur')">
        <ion-icon name="language-outline" slot="start"></ion-icon>
        <ion-label>اردو</ion-label>
        <ion-icon *ngIf="selected === 'ur'" name="checkmark" slot="end"></ion-icon>
      </ion-item>
      <ion-item button (click)="selectLanguage('ps')">
        <ion-icon name="language-outline" slot="start"></ion-icon>
        <ion-label>پښتو</ion-label>
        <ion-icon *ngIf="selected === 'ps'" name="checkmark" slot="end"></ion-icon>
      </ion-item>
    </ion-list>
  `,
  standalone: true,
  imports: [IonicModule, TranslateModule]
})
export class LanguagePopoverComponent {
  selected: string;

  constructor(
    private popoverCtrl: PopoverController,
    private translate: TranslateService
  ) {
    this.selected = this.translate.currentLang;
  }

  selectLanguage(lang: string) {
    this.translate.use(lang);
    this.popoverCtrl.dismiss();
  }
}
