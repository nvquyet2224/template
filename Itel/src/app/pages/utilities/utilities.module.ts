import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UtilitiesPageRoutingModule } from './utilities-routing.module';

import { UtilitiesPage } from './utilities.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UtilitiesPageRoutingModule
  ],
  declarations: [UtilitiesPage]
})
export class UtilitiesPageModule {}
