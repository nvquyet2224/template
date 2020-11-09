import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UtilitiesPage } from './utilities.page';

describe('UtilitiesPage', () => {
  let component: UtilitiesPage;
  let fixture: ComponentFixture<UtilitiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilitiesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UtilitiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
