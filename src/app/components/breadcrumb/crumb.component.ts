import { Router, NavigationEnd } from '@angular/router';
import { CrumbService } from './crumb.service';
import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: __filename,
  selector: 'crumb',
  templateUrl: './crumb.template.html'
})
export class Crumb {
  urls: string[];
  activeUrl: string;

  constructor(private _router: Router, private _service: CrumbService) {
    this._router.events.subscribe(
      (navigation: NavigationEnd) => {
        this.urls = [];
        this.activeUrl = navigation.urlAfterRedirects
          ? navigation.urlAfterRedirects : navigation.url;

        this.buildCrumb(this.activeUrl);
      }
    );
  }

  buildCrumb(url: string): void {
    let _url = this._checkUUID(url);

    this.urls.unshift(_url);

    if (_url.lastIndexOf('/') > 0) {
      this.buildCrumb(_url.substr(0, _url.lastIndexOf('/')));
    }
  }

  getCrumbProperty(url: string, property: string): string {
    return this._service.getUrlProperty(this._checkUUID(url), property);
  }

  hasCrumbProperty(url: string, property: string): boolean {
    return this._service.hasUrlProperty(this._checkUUID(url), property);
  }

  private _checkUUID(url: string): string {
    if (!url) {
      return url;
    }

    let lastArg = url.substr(url.lastIndexOf('/') + 1, url.length);
    /* tslint:disable */
    let isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(lastArg);
    /* tslint:enable */

    return isUUID ? url.substr(0, url.lastIndexOf('/')) : url;
  }
}
