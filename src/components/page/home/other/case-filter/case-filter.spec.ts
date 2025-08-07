import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseFilter } from './case-filter';

describe('CaseFilter', () => {
  let component: CaseFilter;
  let fixture: ComponentFixture<CaseFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
