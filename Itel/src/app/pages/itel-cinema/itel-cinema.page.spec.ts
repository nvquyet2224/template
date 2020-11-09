import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItelCinemaPage } from './itel-cinema.page';

describe('ItelCinemaPage', () => {
  let component: ItelCinemaPage;
  let fixture: ComponentFixture<ItelCinemaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItelCinemaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItelCinemaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
