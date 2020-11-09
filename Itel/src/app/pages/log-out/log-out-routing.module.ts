import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogOutPage } from './log-out.page';

const routes: Routes = [
  {
    path: '',
    component: LogOutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogOutPageRoutingModule {}
