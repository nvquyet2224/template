import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItelSportPageRoutingModule } from './itel-sport-routing.module';

import { ItelSportPage } from './itel-sport.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItelSportPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ItelSportPage]
})
export class ItelSportPageModule {}
