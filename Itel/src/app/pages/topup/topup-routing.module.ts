import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopupPage } from './topup.page';

const routes: Routes = [
  {
    path: '',
    component: TopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopupPageRoutingModule {}
