import { Component, OnInit } from '@angular/core';
import { ListMusic } from 'src/app/models/listMusic';
import { MusicListService } from 'src/app/services/music-list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  musicsList: ListMusic[] = [];

  constructor(private musicListService: MusicListService) { }
      
  ngOnInit() {
    this.musicListService.getAll().subscribe(res => {
      this.musicsList = res;
      console.log('music', this.musicsList);
    })
  }
}
