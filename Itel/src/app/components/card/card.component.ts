import { HttpClient } from '@angular/common/http';
import { Component, ContentChild, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  cardsList: any;
  @Input() itemsData : any[];
  @ContentChild('cardCinema') cardCinema: TemplateRef<ElementRef>;
  @ContentChild('cardSport') cardSport: TemplateRef<ElementRef>;
  constructor(private _http: HttpClient) {
  }
  ngOnInit() {
    // this.cardService.getAll().subscribe(res => {
    //   this.cardsList = res;
    //   console.log('card', this.cardsList);
    // })
  }
}
