import { BaseModel } from './base.model';
import { Injectable } from '@angular/core';

export interface MenuModelItem {
  label?: string;
  className?: string;
  icon?: string;
  url?: string;
  fn?: Function;
  tree?: any;
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
          label: 'Tags',
          url: '/admin/tags',
          icon: 'fa fa-bookmark-o'
        },
        {
          label: 'Portfolio',
          url: '/admin/portfolio',
          icon: 'fa fa-picture-o'
        },
        {
          label: 'Pages',
          url: '/admin/pages',
          icon: 'fa fa-file-text'
        },
        {
          label: 'Settings',
          url: '/admin/settings',
          icon: 'fa fa-cogs'
        }
      ];
    }
  }
}
