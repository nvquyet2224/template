import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopupPageRoutingModule } from './topup-routing.module';

import { TopupPage } from './topup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopupPageRoutingModule
  ],
  declarations: [TopupPage]
})
export class TopupPageModule {}
