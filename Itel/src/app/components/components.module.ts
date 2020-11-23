import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { SlideComponent } from './slide/slide.component';
import { ListComponent } from './list/list.component';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from './button/button.component';
import { HttpClientModule } from '@angular/common/http';
import { BannerComponent } from './banner/banner.component';
import { MenuComponent } from './menu/menu.component';
import { TabComponent } from './tab/tab.component';
import { SliderComponent } from './slider/slider.component';

@NgModule({
    declarations: [
      HeaderComponent,
      FooterComponent,
      CardComponent,
      SlideComponent,
      ListComponent,
      ButtonComponent,
      BannerComponent,
      MenuComponent,
      TabComponent,
      SliderComponent
    ],
    exports: [
      HeaderComponent,
      FooterComponent,
      CardComponent,
      SlideComponent,
      ListComponent,
      ButtonComponent,
      BannerComponent,
      MenuComponent,
      TabComponent,
      SliderComponent
    ],
    imports: [
      CommonModule,
      RouterModule,
      FormsModule,
      IonicModule,
      HttpClientModule
    ],
    providers: [
      BannerComponent
    ]
})
export class ComponentsModule {
}
