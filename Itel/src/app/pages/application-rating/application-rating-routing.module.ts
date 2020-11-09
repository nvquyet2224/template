import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationRatingPage } from './application-rating.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicationRatingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationRatingPageRoutingModule {}
