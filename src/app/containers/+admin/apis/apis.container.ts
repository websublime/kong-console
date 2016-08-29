import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Container, ApisService, ApisModelResource, SYMBOLS } from '../../../shared';

@Component({
  moduleId: __filename,
  selector: 'apis',
  templateUrl: './apis.template.html',
  providers: [ApisService]
})
export class ApisContainer extends Container implements OnInit {
  apisModel: Array<ApisModelResource>;

  constructor(private _apiService: ApisService, private _router: Router) {
    super();
  }

  ngOnInit() {
    this._apiService.apis()
      .subscribe((apisModel) => {
        this.apisModel = apisModel.collection.data;
      });
  }

  goToNewApi(event: MouseEvent) {
    event.preventDefault();

    this._router.navigate([SYMBOLS.ROUTES.APIS.NEW]);
  }
}
