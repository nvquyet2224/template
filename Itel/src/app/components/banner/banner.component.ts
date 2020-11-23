import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Banner } from 'src/app/models/banner';
import { PageTypeEnum } from 'src/app/models/enum/page-type-enum';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  bannersList: Banner[] = [];
  typeEnum = PageTypeEnum;
  @Input() type: number;
  constructor(private bannerService: BannerService) { }
  
  ngOnInit() {
    this.BannerType(this.type);
  }

  public BannerType(type?: number) {
    if(type == 1) {
      this.bannerService.getAll(this.typeEnum.Cinema).subscribe(res => {
            this.bannersList = res;
            console.log('banner', this.bannersList);
          });
    } else if (type == 2) {
      this.bannerService.getAll(this.typeEnum.Game).subscribe(res => {
            this.bannersList = res;
            console.log('banner', this.bannersList);
      });
    } else if (type == 3) {
      this.bannerService.getAll(this.typeEnum.Sport).subscribe(res => {
        this.bannersList = res;
      })
    } else {
      this.bannerService.getAll(this.typeEnum.Music).subscribe(res => {
        this.bannersList = res;
      })
    }
  }  

}
