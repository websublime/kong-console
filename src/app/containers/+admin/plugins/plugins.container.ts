import { Component, OnInit, OnDestroy } from '@angular/core';

import { lowerCase, capitalize, get, includes } from 'lodash';

import { Container } from '../../../core';
import { Modal } from '../../../components';
import {
  SYMBOLS, PluginsService, StatusService
} from '../../../shared';

@Component({
  moduleId: __filename,
  selector: 'plugins-page',
  templateUrl: './plugins.template.html',
  providers: [ PluginsService, StatusService ]
})
export class PluginsContainer extends Container implements OnInit, OnDestroy {

  available: Array<{ id: string; label: string; icon: string; active: boolean; }> = [];

  constructor(
    private plugService: PluginsService,
    private statusService: StatusService
  ) {
    super();
  }

  ngOnInit() {
    this.subscriptions = this.plugService.plugins()
      .subscribe((rs) => {
        console.log(rs);
      });

    this.subscriptions = this.statusService.kong()
      .subscribe((kongModel) => {
        let available = kongModel.plugins.available_on_server;
        let active = kongModel.plugins.enabled_in_cluster;

        /*this.available = available.map((value) => {
          return {
            id: value,
            label: capitalize(lowerCase(value)),
            icon: get(SYMBOLS.PLUGINS.ICONS, value, ''),
            active: includes(active, value)
          };
        });*/

        console.log(kongModel);
      });
  }

  ngOnDestroy() {
    this.clean();
  }

}
