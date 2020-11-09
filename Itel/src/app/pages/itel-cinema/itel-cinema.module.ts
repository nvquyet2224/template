import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItelCinemaPageRoutingModule } from './itel-cinema-routing.module';

import { ItelCinemaPage } from './itel-cinema.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItelCinemaPageRoutingModule
  ],
  declarations: [ItelCinemaPage]
})
export class ItelCinemaPageModule {}
