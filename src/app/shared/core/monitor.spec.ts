import { Component } from '@angular/core';
import { MonitorException } from './monitor';
import { inject, TestBed } from '@angular/core/testing';

@Component({
  moduleId: 'MockComponent',
  selector: 'mock-component',
  template: ''
})
class MockComponent {
  throw() {
    let exception = new MonitorException(false);
    exception.handleError(new Error('Throwing error.'));
  }

  rethrow() {
    let exception = new MonitorException(true);
    exception.handleError(new Error('Throwing error.'));
  }
}

describe('> Monitor.', () => {
  let component: MockComponent;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MockComponent
    ]
  }));

  beforeEach(inject([MockComponent], (mockComponent: MockComponent) => {
    component = mockComponent;
  }));

  it('# should throw simple monitor error.', () => {
    expect(component.throw).toThrowError('Throwing error.');
  });

  it('# should rethrow full stack error.', () => {
    expect(component.rethrow).toThrowError('Throwing error.');
  });
});
