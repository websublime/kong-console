import { ROUTER_DIRECTIVES } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface SideBarModel {
  label?: string;
  className?: string;
  icon?: string;
  url?: string;
  fn?: Function;
  tree?: any;
}

@Component({
  moduleId: __filename,
  selector: 'sidebar',
  templateUrl: './sidebar.template.html',
  directives: [ROUTER_DIRECTIVES]
})
export class SideBar {
  @Input() model: SideBarModel;
  @Output() onLinkClick = new EventEmitter<any>();

  sideBarItem(item: SideBarModel) {
    this.onLinkClick.emit(item);
  }
}
