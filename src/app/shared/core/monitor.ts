import { Injectable, ErrorHandler } from '@angular/core';

@Injectable()
export class MonitorException extends ErrorHandler {
  handleError(error: any,) {
    // To be used with any service to log
    console.log('---MONITOR---');
    console.log(error);
  }
}
