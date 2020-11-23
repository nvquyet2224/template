export class Slide {
    constructor(
        public id = 0,
        public slideCaption: string = '',
        public slideTitle: string = '',
        public slideSubTitle: string = '',
        public slideImg: string = '',
        public slideType = 0
    ) { }
}
