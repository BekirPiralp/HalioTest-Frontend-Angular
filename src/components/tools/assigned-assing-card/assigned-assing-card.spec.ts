import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedAssingCard } from './assigned-assing-card';

describe('AssignedAssingCard', () => {
  let component: AssignedAssingCard;
  let fixture: ComponentFixture<AssignedAssingCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedAssingCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedAssingCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
