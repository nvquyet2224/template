import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterHistoryPage } from './register-history.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterHistoryPageRoutingModule {}
