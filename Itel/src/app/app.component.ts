import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Thông báo',
      url: '/notification',
      icon: 'notification'
    },
    {
      title: 'Topup',
      url: '/topup',
      icon: 'topup'
    },
    {
      title: 'Tiện ích',
      url: '/utilities',
      icon: 'utilities'
    },
    {
      title: 'iTel game',
      url: '/itel-game',
      icon: 'archive'
    },
    {
      title: 'iTel cinema',
      url: '/itel-cinema',
      icon: 'trash'
    },
    {
      title: 'iTel sport',
      url: '/itel-sport',
      icon: 'warning'
    },
    {
      title: 'iTel music',
      url: '/itel-music',
      icon: 'trash'
    },
    {
      title: 'Tra cước',
      url: '/postage',
      icon: 'trash'
    },
    {
      title: 'Lịch sử thanh toán',
      url: '/payment-history',
      icon: 'trash'
    },
    {
      title: 'Lịch sử đăng ký / hủy dịch vụ',
      url: '/register-history',
      icon: 'trash'
    },
    {
      title: 'Trung tâm hỗ trợ',
      url: '/support-center',
      icon: '_support-center'
    },
    {
      title: 'Xếp hạng ứng dụng',
      url: '/application-rating',
      icon: '_application-rating'
    },
    {
      title: 'Đăng xuất',
      url: '/log-out',
      icon: '_logout'
    }
    
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      console.log('ready');
    });
  }

  ngOnInit() {
    // const path = window.location.pathname.split('folder/')[1];
    // if (path !== undefined) {
    //   this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    // }
    //this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
  }
}
