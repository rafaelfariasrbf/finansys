import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContasContainerComponent } from './contas-container.component';

describe('ContasContainerComponent', () => {
  let component: ContasContainerComponent;
  let fixture: ComponentFixture<ContasContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContasContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContasContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
