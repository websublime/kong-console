import { Component, OnInit } from '@angular/core';
import { Container, StatusService } from '../../../shared';
import { SmallBox, SmallBoxModel } from '../../../components';
import {
  StatusModel, StatusModelResourceServer, StatusModelResourceDatabase
} from '../../../shared';

@Component({
  moduleId: __filename,
  selector: 'home',
  templateUrl: './home.template.html',
  providers: [StatusService],
  directives: [SmallBox]
})
export class HomeContainer extends Container implements OnInit {
  boxModel: Array<SmallBoxModel>;

  constructor(private _statusService: StatusService) {
    super();
  }

  ngOnInit() {
    this._statusService.status()
      .subscribe((statusModel: StatusModel) => {
        let server = <StatusModelResourceServer>statusModel.getAttribute('server');
        let db = <StatusModelResourceDatabase>statusModel.getAttribute('database');

        this.boxModel = [
          {
            info: 'Requests',
            title: server.total_requests.toString(),
            icon: 'ion ion-stats-bars',
            classBg: 'small-box bg-aqua'
          },
          {
            info: 'Connections',
            title: server.connections_accepted.toString(),
            icon: 'ion ion-log-in',
            classBg: 'small-box bg-green'
          },
          {
            info: 'Connections Active',
            title: server.connections_active.toString(),
            icon: 'ion ion-ios-pulse-strong',
            classBg: 'small-box bg-yellow'
          },
          {
            info: 'Apis',
            title: db.apis.toString(),
            icon: 'ion ion-ios-analytics',
            classBg: 'small-box bg-red'
          }
        ];
      });
  }
}
