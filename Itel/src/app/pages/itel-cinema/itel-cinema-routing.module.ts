import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItelCinemaPage } from './itel-cinema.page';

const routes: Routes = [
  {
    path: '',
    component: ItelCinemaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItelCinemaPageRoutingModule {}
