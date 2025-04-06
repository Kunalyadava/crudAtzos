import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostcomponentComponent } from './postcomponent.component';

describe('PostcomponentComponent', () => {
  let component: PostcomponentComponent;
  let fixture: ComponentFixture<PostcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostcomponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
