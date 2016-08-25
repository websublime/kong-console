import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Header, Footer, SideBar, SideBarModel } from '../components';
import {
  Container,
  State,
  SYMBOLS,
  makeSymbolPath,
  AuthService,
  MenuModel
} from '../shared';

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
    private _appState: State,
    private _authService: AuthService,
    private _router: Router
  ) {
    super();
  }

  ngOnInit() {
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

    let menuModel = new MenuModel();
    this.sideBarModel = menuModel.getAttribute('menu');
  }

  signOut(event: MouseEvent): void {
    event.preventDefault();

    this._authService.logout();
    this._router.navigate([SYMBOLS.ROUTES.LOGIN]);
  }
}
