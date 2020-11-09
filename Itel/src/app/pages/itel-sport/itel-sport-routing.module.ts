import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItelSportPage } from './itel-sport.page';

const routes: Routes = [
  {
    path: '',
    component: ItelSportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItelSportPageRoutingModule {}
