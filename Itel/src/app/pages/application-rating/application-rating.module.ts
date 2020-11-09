import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicationRatingPageRoutingModule } from './application-rating-routing.module';

import { ApplicationRatingPage } from './application-rating.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicationRatingPageRoutingModule
  ],
  declarations: [ApplicationRatingPage]
})
export class ApplicationRatingPageModule {}
