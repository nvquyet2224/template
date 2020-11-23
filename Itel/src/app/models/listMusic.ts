export class ListMusic {
    constructor(
        public id = 0,
        public musicCaption: string = '',
        public musicName: string = '',
        public musicImg: string = '',
        public musicAuthor: string = '',
        public musicTiming: string = '',
        public musicType = 0
    ) { }
}