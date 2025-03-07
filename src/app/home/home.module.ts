import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, // ✅ Ensure IonicModule is imported correctly
    RouterModule,
    HomePageRoutingModule,
    TranslateModule
  ],
  declarations: [HomePage ,], // ✅ Declare components properly
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // ✅ Allow Web Components like 'ion-icon'
})
export class HomePageModule {}
