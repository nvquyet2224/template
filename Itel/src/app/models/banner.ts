// export interface Card {
//     card_caption: string;
//     card_title: string;
//     card_sub: string;
//     card_img: string;
// }
export class Banner {
  
  constructor (
    public id = 0,
    public bannerCaption: string = '',
    public bannerTitle: string = '',
    public bannerSub: string = '',
    public bannerImg: string = '',
    public bannerType = 0
  ) { }
}
