import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItelSportPageRoutingModule } from './itel-sport-routing.module';

import { ItelSportPage } from './itel-sport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItelSportPageRoutingModule
  ],
  declarations: [ItelSportPage]
})
export class ItelSportPageModule {}
