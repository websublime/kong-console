import { Container, Size } from '../../shared';
import { Component, OnInit } from '@angular/core';
import { Crumb, CrumbService, CrumbTreeModel } from '../../components';

@Component({
  moduleId: __filename,
  selector: 'admin',
  templateUrl: './admin.template.html',
  directives: [Crumb, Size],
  providers: [CrumbService]
})
export class AdminContainer extends Container implements OnInit {

  constructor(private _crumbService: CrumbService) {
    super();
  }

  ngOnInit() {
    let crumbTreeModel: CrumbTreeModel = {
      '/admin': {
        title: 'Dashboard',
        info: 'Resume view',
        label: 'Control Panel'
      }
    };

    this._crumbService.addCrumbTree(crumbTreeModel);
  }
}
