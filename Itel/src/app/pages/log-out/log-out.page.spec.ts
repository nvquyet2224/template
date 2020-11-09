import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogOutPage } from './log-out.page';

describe('LogOutPage', () => {
  let component: LogOutPage;
  let fixture: ComponentFixture<LogOutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogOutPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LogOutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
