import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonTreeViewComponent } from './json-tree-view.component';

describe('JsonTreeViewComponent', () => {
  let component: JsonTreeViewComponent;
  let fixture: ComponentFixture<JsonTreeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonTreeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
