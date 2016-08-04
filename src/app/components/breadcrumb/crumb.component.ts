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
    this.urls.unshift(url);
    if (url.lastIndexOf('/') > 0) {
      this.buildCrumb(url.substr(0, url.lastIndexOf('/')));
    }
  }

  getCrumbProperty(url: string, property: string): string {
    return this._service.getUrlProperty(url, property);
  }

  hasCrumbProperty(url: string, property: string): boolean {
    return this._service.hasUrlProperty(url, property);
  }
}
