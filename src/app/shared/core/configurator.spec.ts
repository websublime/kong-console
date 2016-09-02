import { Configurator } from './configurator';
import { inject, TestBed } from '@angular/core/testing';

describe('> Configurator.', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      Configurator
    ]
  }));

  it('# Initial options state empty.', inject([Configurator], (config: Configurator) => {
    expect(config.options).toEqual({});
  }));

  it('# Set an option.', inject([Configurator], (config: Configurator) => {
    config.setOption('my.new.option', 1);
    expect(config.getOption('my.new.option')).toEqual(1);
  }));

  it('# Set a defaut value case doesn\'t exist.', inject([Configurator], (config: Configurator) => {
    expect(config.getOption('not.a.option', false)).toBeFalsy();
  }));

  it('# Check if an option exist.', inject([Configurator], (config: Configurator) => {
    expect(config.hasOption('a.fake.option')).toBeFalsy();
  }));

  describe('> Configurator with initial options.', () => {
    let _config: Configurator;

    beforeEach(inject([Configurator], (config: Configurator) => {
      _config = config;
      _config.options = {
        one: true,
        level: {
          down: true,
          deep: {
            option: 1
          }
        }
      };
    }));

    it('# Initial tree flated.', () => {
      expect(_config.hasOption('one')).toBeTruthy();
      expect(_config.hasOption('level.down')).toBeTruthy();
      expect(_config.hasOption('level.deep.option')).toBeTruthy();
    });
  });
});
