import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItelSportPage } from './itel-sport.page';

describe('ItelSportPage', () => {
  let component: ItelSportPage;
  let fixture: ComponentFixture<ItelSportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItelSportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItelSportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
