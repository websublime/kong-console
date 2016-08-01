import {
  beforeEachProviders,
  inject,
  it
} from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { Descriptor } from './descriptor';

@Component({
  moduleId: 'MockComponent',
  selector: 'mock-component',
  template: ''
})
class MockComponent extends Descriptor implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
    this.state = {
      active: false
    };

    this.setProp('status', false);
  }

  changePropStatus(status: boolean): void {
    this.setProp('status', status);
  }

  changeState(state: Object): void {
    this.state = state;
  }
}

describe('> Descriptor', () => {
  let component: MockComponent;

  beforeEachProviders(() => [
    MockComponent
  ]);

  beforeEach(inject([MockComponent], (mockComponent: MockComponent) => {
    component = mockComponent;
  }));

  it('# Should have props and state.', () => {
    component.ngOnInit();
    expect(component.getProp('status')).toBeFalsy();
    expect(component.state).toEqual({ active: false });
  });

  it('# Listen on event emitter.', () => {
    component.event().subscribe((rs: {props: Object}) => {
      expect(rs.hasOwnProperty('props')).toBeTruthy();
      expect(rs.props.hasOwnProperty('status')).toBeTruthy();
      expect((rs.props as any).status).toBeTruthy();
    });

    component.changePropStatus(true);
  });

  it('# Subscribe as observable.', () => {
    component.observe().subscribe((rs: {state: Object}) => {
      expect(rs.hasOwnProperty('state')).toBeTruthy();
      expect(rs.state.hasOwnProperty('active')).toBeTruthy();
      expect((rs.state as any).active).toBeTruthy();
    });

    component.changeState({ active: true });
  });

  it('# Should reset all props.', () => {
    component.resetProps();
    expect(component.getProp('fake')).toEqual({});
  });
});
