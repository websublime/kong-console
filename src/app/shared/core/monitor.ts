import { Injectable, ExceptionHandler } from '@angular/core';

@Injectable()
export class MonitorException extends ExceptionHandler {
  call(exception: any, stackTrace?: any, reason?: string) {
    // To be used with any service to log
    console.log('---MONITOR---');
    console.log(exception, stackTrace, reason);
  }
}
