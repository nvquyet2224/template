import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItelGamePage } from './itel-game.page';

describe('ItelGamePage', () => {
  let component: ItelGamePage;
  let fixture: ComponentFixture<ItelGamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItelGamePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItelGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
