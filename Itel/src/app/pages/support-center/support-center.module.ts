import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupportCenterPageRoutingModule } from './support-center-routing.module';

import { SupportCenterPage } from './support-center.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupportCenterPageRoutingModule
  ],
  declarations: [SupportCenterPage]
})
export class SupportCenterPageModule {}
