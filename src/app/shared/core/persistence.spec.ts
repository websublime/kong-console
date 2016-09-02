import { inject, TestBed } from '@angular/core/testing';
import { Persistence } from './persistence';

describe('> Persistence', () => {
  let persistence: Persistence;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      Persistence
    ]
  }));

  beforeEach(inject([Persistence], (_persistence: Persistence) => {
    persistence = _persistence;
  }));

  it('# Check if has support.', () => {
    expect(persistence.supported()).toBeTruthy();
  });

  it('# Set data to persist.', () => {
    persistence.set('option', { equal: 1 });
    expect(persistence.get('option')).toEqual(JSON.stringify({ equal: 1 }));
  });

  it('# Get all data persisted.', () => {
    persistence.set('settings', { equal: 1 });
    expect(persistence.all()).toEqual({ option: '{"equal":1}', settings: '{"equal":1}' });
  });

  it('# Delete data persisted.', () => {
    persistence.delete('settings');
    expect(persistence.get('option')).toEqual(JSON.stringify({ equal: 1 }));
  });

  it('# Clear all persisted data.', () => {
    persistence.clear();
    expect(persistence.get('option')).toBeUndefined();
  });
});
