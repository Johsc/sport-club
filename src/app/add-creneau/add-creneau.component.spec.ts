import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCreneauComponent } from './add-creneau.component';

describe('AddCreneauComponent', () => {
  let component: AddCreneauComponent;
  let fixture: ComponentFixture<AddCreneauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCreneauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCreneauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
