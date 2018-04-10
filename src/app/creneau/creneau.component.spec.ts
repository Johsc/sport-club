import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreneauComponent } from './creneau.component';

describe('CreneauComponent', () => {
  let component: CreneauComponent;
  let fixture: ComponentFixture<CreneauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreneauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreneauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
