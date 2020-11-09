import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostagePageRoutingModule } from './postage-routing.module';

import { PostagePage } from './postage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostagePageRoutingModule
  ],
  declarations: [PostagePage]
})
export class PostagePageModule {}
