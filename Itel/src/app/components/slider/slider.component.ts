import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { Slide } from '../../models/slide';
// import { Category } from 'src/app/models/category';
// import { CategoryTypeEnum } from 'src/app/models/enum/page-type-enum';
// import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  category: Category[] = [];
  @Input() type: number;
  @Input() name: any;
  @Input() sprSlider: number;

  categoryType: number;
  categoryName: string;
  cateSliders: Slide;
  slideOpts = null;


  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    if (this.sprSlider === 1) {
      this.slideOpts = {
        slidesPerView: 1,
        initialSlide: 1,
        speed: 400,
        // autoplay: {
        //   delay: 3000,
        //   disableOnInteraction: false
        // },
        on: {
          ionSlideTransitionStart() {
            console.log('next start');
          }, ionSlideTransitionEnd() {
            console.log('next end');
          }
        }
      };
    } else if (this.sprSlider === 2) {
      this.slideOpts = {
        slidesPerView: 2,
        initialSlide: 1,
        speed: 400,
        // autoplay: {
        //   delay: 3000,
        //   disableOnInteraction: false
        // },
        on: {
          ionSlideTransitionStart() {
            console.log('next start');
          }, ionSlideTransitionEnd() {
            console.log('next end');
          }
        }
      };
    }

    console.log(this.type);
    this.categoryService.getAll(this.type).subscribe(res => {
      this.category = res;
      this.categoryName = this.category[0].categoryName;
      this.cateSliders = this.category[0].slides;
    });
  }

}
