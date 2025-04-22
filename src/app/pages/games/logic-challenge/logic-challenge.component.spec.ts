import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicChallengeComponent } from './logic-challenge.component';

describe('LogicChallengeComponent', () => {
  let component: LogicChallengeComponent;
  let fixture: ComponentFixture<LogicChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogicChallengeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogicChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
