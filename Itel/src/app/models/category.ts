import { Slide } from './slide';

export class Category {
   constructor(
       public categoryName: string = '',
       public categoryType = 0,
       public slides: Slide
   ) {}
}
