import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMemberComponent } from './menu-member.component';

describe('MenuMemberComponent', () => {
  let component: MenuMemberComponent;
  let fixture: ComponentFixture<MenuMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
