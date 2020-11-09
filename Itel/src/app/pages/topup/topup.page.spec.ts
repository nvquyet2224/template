import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TopupPage } from './topup.page';

describe('TopupPage', () => {
  let component: TopupPage;
  let fixture: ComponentFixture<TopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
