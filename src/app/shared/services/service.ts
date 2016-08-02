import { Injectable } from '@angular/core';
import { InjectAdapter } from '../core/annotations';

@Injectable()
export abstract class Service {
  @InjectAdapter
  adapter: any;
}
