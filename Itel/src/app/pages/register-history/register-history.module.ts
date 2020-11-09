import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterHistoryPageRoutingModule } from './register-history-routing.module';

import { RegisterHistoryPage } from './register-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterHistoryPageRoutingModule
  ],
  declarations: [RegisterHistoryPage]
})
export class RegisterHistoryPageModule {}
