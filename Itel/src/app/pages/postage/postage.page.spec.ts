import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostagePage } from './postage.page';

describe('PostagePage', () => {
  let component: PostagePage;
  let fixture: ComponentFixture<PostagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
