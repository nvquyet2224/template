import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    //redirectTo: 'folder/Inbox',
    //redirectTo: 'notification',
    //pathMatch: 'full'
  },
  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  // },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./pages/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'topup',
    loadChildren: () => import('./pages/topup/topup.module').then( m => m.TopupPageModule)
  },
  {
    path: 'utilities',
    loadChildren: () => import('./pages/utilities/utilities.module').then( m => m.UtilitiesPageModule)
  },
  {
    path: 'itel-game',
    loadChildren: () => import('./pages/itel-game/itel-game.module').then( m => m.ItelGamePageModule)
  },
  {
    path: 'itel-cinema',
    loadChildren: () => import('./pages/itel-cinema/itel-cinema.module').then( m => m.ItelCinemaPageModule)
  },
  {
    path: 'itel-sport',
    loadChildren: () => import('./pages/itel-sport/itel-sport.module').then( m => m.ItelSportPageModule)
  },
  {
    path: 'itel-music',
    loadChildren: () => import('./pages/itel-music/itel-music.module').then( m => m.ItelMusicPageModule)
  },
  {
    path: 'postage',
    loadChildren: () => import('./pages/postage/postage.module').then( m => m.PostagePageModule)
  },
  {
    path: 'payment-history',
    loadChildren: () => import('./pages/payment-history/payment-history.module').then( m => m.PaymentHistoryPageModule)
  },
  {
    path: 'register-history',
    loadChildren: () => import('./pages/register-history/register-history.module').then( m => m.RegisterHistoryPageModule)
  },
  {
    path: 'support-center',
    loadChildren: () => import('./pages/support-center/support-center.module').then( m => m.SupportCenterPageModule)
  },
  {
    path: 'application-rating',
    loadChildren: () => import('./pages/application-rating/application-rating.module').then( m => m.ApplicationRatingPageModule)
  },
  {
    path: 'log-out',
    loadChildren: () => import('./pages/log-out/log-out.module').then( m => m.LogOutPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
