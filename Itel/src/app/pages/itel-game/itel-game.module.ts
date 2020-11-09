import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItelGamePageRoutingModule } from './itel-game-routing.module';

import { ItelGamePage } from './itel-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItelGamePageRoutingModule
  ],
  declarations: [ItelGamePage]
})
export class ItelGamePageModule {}
