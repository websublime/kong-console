import {
  beforeEachProviders,
  inject,
  it
} from '@angular/core/testing';
import { Configurator } from './configurator';

describe('Configurator', () => {
  beforeEachProviders(() => [
    Configurator
  ]);

  it('...', inject([Configurator], (config) => {
    console.log(config);
  }));
});
