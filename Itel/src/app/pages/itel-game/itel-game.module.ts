import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItelGamePageRoutingModule } from './itel-game-routing.module';

import { ItelGamePage } from './itel-game.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItelGamePageRoutingModule,
    ComponentsModule
  ],
  declarations: [ItelGamePage]
})
export class ItelGamePageModule {}
