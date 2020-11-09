import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItelMusicPage } from './itel-music.page';

const routes: Routes = [
  {
    path: '',
    component: ItelMusicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItelMusicPageRoutingModule {}
