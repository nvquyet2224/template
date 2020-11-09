import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItelGamePage } from './itel-game.page';

const routes: Routes = [
  {
    path: '',
    component: ItelGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItelGamePageRoutingModule {}
