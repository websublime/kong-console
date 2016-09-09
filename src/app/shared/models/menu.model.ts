import { BaseModel } from './base.model';
import { Injectable } from '@angular/core';

export interface MenuModelItem {
  label?: string;
  className?: string;
  icon?: string;
  url?: string;
  fn?: Function;
  tree?: Array<MenuModelItem>;
}

@Injectable()
export class MenuModel extends BaseModel {
  menu: Array<MenuModelItem>;

  constructor(menu?: Array<MenuModelItem>) {
    super();

    if (menu) {
      Object.assign(this.menu, menu);
    } else {
      this.menu = [
        {
          label: 'Apis',
          url: '/admin/apis',
          icon: 'fa fa-gg',
          /*tree: [
            {
              label: 'Plugs',
              url: '/admin/apis/plugins',
              icon: 'fa fa-puzzle-piece'
            }
          ]*/
        },
        {
          label: 'Consumers',
          url: '/admin/consumers',
          icon: 'fa fa-spoon'
        },
        {
          label: 'Plugins',
          url: '/admin/plugins',
          icon: 'fa fa-plug'
        }
      ];
    }
  }
}
