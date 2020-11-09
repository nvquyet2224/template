import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogOutPageRoutingModule } from './log-out-routing.module';

import { LogOutPage } from './log-out.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogOutPageRoutingModule
  ],
  declarations: [LogOutPage]
})
export class LogOutPageModule {}
