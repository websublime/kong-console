import { Injectable, ErrorHandler } from '@angular/core';

@Injectable()
export class MonitorException extends ErrorHandler {
  handleError(error: any) {
    // To be used with any service to log

    if ((this as any).rethrowError) {
      super.handleError(error);
    } else {
      console.log('---MONITOR---');
      console.error(error);

      throw error;
    }
  }
}
