import { Component, ContentChild, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BannerComponent } from 'src/app/components/banner/banner.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { SlideComponent } from 'src/app/components/slide/slide.component';
import { Banner } from 'src/app/models/banner';
import { PageTypeEnum } from 'src/app/models/enum/page-type-enum';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-itel-game',
  templateUrl: './itel-game.page.html',
  styleUrls: ['./itel-game.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItelGamePage implements OnInit {
  @Input() banner: Banner;
  type: number;
  typeEnum = PageTypeEnum;
  bannersList: Banner[];
  constructor(private bannerComponent: BannerComponent) { }

  ngOnInit() {
    // this.bannerComponent.BannerType(4);
    // console.log('abc',this.bannerComponent.BannerType(4))
  }
}
