import { inject, TestBed } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { Container } from './container';

@Component({
  moduleId: 'MockContainer',
  selector: 'mock-container',
  template: ''
})
class MockContainer extends Container implements OnInit {
  active: boolean;

  constructor() {
    super();
  }

  ngOnInit() {
    this.active = false;
  }
}

describe('> Container.', () => {
  let component: MockContainer;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MockContainer
    ]
  }));

  beforeEach(inject([MockContainer], (mockContainer: MockContainer) => {
    component = mockContainer;
  }));

  it('# Set active on ngOnInit.', () => {
    expect(component.active).toBeUndefined();
    component.ngOnInit();
    expect(component.active).toBeFalsy();
  });

  it('# Change detection for active property.', () => {
    component.changeDetection((active: boolean) => {
      component.active = active;
      expect(component.active).toBeTruthy();
    }, [true], component);
  });

  it('# Change detection with minimum parameters.', () => {
    component.changeDetection((args: undefined) => {
      expect(args).toBeUndefined();
    });
  });
});
