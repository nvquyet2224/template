import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SupportCenterPage } from './support-center.page';

describe('SupportCenterPage', () => {
  let component: SupportCenterPage;
  let fixture: ComponentFixture<SupportCenterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportCenterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SupportCenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
