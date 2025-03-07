import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PopoverController } from '@ionic/angular';
import { LanguagePopoverComponent } from './components/language-popover/language-popover.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  selectedLanguage: string = 'en';

  constructor(
    private translate: TranslateService,
    private popoverCtrl: PopoverController
  ) {
    translate.setDefaultLang('en');
    translate.addLangs(['en', 'ur', 'ps']);

    // Get browser language or default to English
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|ur|ps/) ? browserLang : 'en');
  }

  async presentLanguagePopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: LanguagePopoverComponent,
      event: ev,
      translucent: true
    });
    await popover.present();
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ur' || lang === 'ps' ? 'rtl' : 'ltr';
  }
}
