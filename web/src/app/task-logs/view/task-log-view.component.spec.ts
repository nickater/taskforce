import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskLogViewComponent } from './task-log-view.component';

describe('TaskLogViewComponent', () => {
  let component: TaskLogViewComponent;
  let fixture: ComponentFixture<TaskLogViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskLogViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskLogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
