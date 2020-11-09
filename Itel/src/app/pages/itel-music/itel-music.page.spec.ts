import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItelMusicPage } from './itel-music.page';

describe('ItelMusicPage', () => {
  let component: ItelMusicPage;
  let fixture: ComponentFixture<ItelMusicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItelMusicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItelMusicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
