import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItelMusicPageRoutingModule } from './itel-music-routing.module';

import { ItelMusicPage } from './itel-music.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItelMusicPageRoutingModule
  ],
  declarations: [ItelMusicPage]
})
export class ItelMusicPageModule {}
