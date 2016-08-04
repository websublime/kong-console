import { Component, OnInit } from '@angular/core';
import { Container, State, SYMBOLS, makeSymbolPath } from '../shared';
import { Header, Footer, SideBar, SideBarModel } from '../components';

@Component({
  moduleId: __filename,
  selector: 'app',
  templateUrl: './app.template.html',
  directives: [Header, Footer, SideBar]
})
export class App extends Container implements OnInit {
  UIHEADER = SYMBOLS.HEADER;
  UISIDEBAR = SYMBOLS.SIDEBAR;
  UIFOOTER = SYMBOLS.FOOTER;

  sideBarModel: Array<SideBarModel> = [];

  constructor(
    private _appState: State
  ) {
    super();
  }

  ngOnInit() {
    this.sideBarModel = [
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

    this.setProp(this.UIFOOTER, this._appState.get(makeSymbolPath([SYMBOLS.UI, SYMBOLS.FOOTER])));
    this.setProp(this.UIHEADER, this._appState.get(makeSymbolPath([SYMBOLS.UI, SYMBOLS.HEADER])));
    this.setProp(this.UISIDEBAR, this._appState.get(makeSymbolPath([SYMBOLS.UI, SYMBOLS.SIDEBAR])));

    this._appState.observe().subscribe((rs: any) => {
      this.changeDetection(
        () => {
          this.setProp(this.UIFOOTER, rs[SYMBOLS.UI][SYMBOLS.FOOTER]);
          this.setProp(this.UIHEADER, rs[SYMBOLS.UI][SYMBOLS.HEADER]);
          this.setProp(this.UISIDEBAR, rs[SYMBOLS.UI][SYMBOLS.SIDEBAR]);
        }
      );
    });
  }
}
