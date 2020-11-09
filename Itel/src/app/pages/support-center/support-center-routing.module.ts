import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportCenterPage } from './support-center.page';

const routes: Routes = [
  {
    path: '',
    component: SupportCenterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportCenterPageRoutingModule {}
