import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterHistoryPage } from './register-history.page';

describe('RegisterHistoryPage', () => {
  let component: RegisterHistoryPage;
  let fixture: ComponentFixture<RegisterHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterHistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
