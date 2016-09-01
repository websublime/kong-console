import { Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  Container, ApisService, ApisModelResource,
  SYMBOLS, paginate, ApiGetParameters, PaginateModel
} from '../../../shared';

@Component({
  moduleId: __filename,
  selector: 'apis',
  templateUrl: './apis.template.html',
  providers: [ApisService],
  styles: [
    `
    .form-group, .input-group {
      margin-left: 10px;
    }
    .input-group {
      width: 20%;
    }
    li > a {
      cursor: pointer;
    }
    `
  ]
})
export class ApisContainer extends Container implements OnInit {
  next: string;
  toolsGroup: FormGroup;
  pagination: PaginateModel = paginate(1);
  apisModel: Array<ApisModelResource>;
  entriesLength: Array<number> = [10, 25, 50, 100];

  constructor(private _apiService: ApisService, private _router: Router) {
    super();
  }

  ngOnInit() {
    this.subscriptions = this._getApis();

    this.toolsGroup = new FormGroup({
      entries: new FormControl(this.entriesLength[0]),
      search: new FormControl()
    });

    this.toolsGroup.get('entries').valueChanges
      .subscribe((entry: number) => {
        let args = { size: entry.toString() };

        this._getApis(args);
      });
  }

  onSearch(event: MouseEvent) {
    event.preventDefault();

    let search = this.toolsGroup.get('search').value;
    let size = this.toolsGroup.get('entries').value || 10;

    if (search) {
      this._getApis({ name: search, size: size });
    }
  }

  onPrevious(event: MouseEvent) {
    this.pagination = paginate(1);
    this._getApis();
  }

  onNext(event: MouseEvent) {
    let params = new URLSearchParams(this.next);
    let size = this.toolsGroup.get('entries').value || 10;
    let search = this.toolsGroup.get('search').value;

    let args = { size: size, offset: params.get('offset') };

    if (search) {
      args['name'] = search;
    }

    this._getApis(args);
  }

  goToNewApi(event: MouseEvent) {
    event.preventDefault();

    this._router.navigate([SYMBOLS.ROUTES.APIS.NEW]);
  }

  private _getApis(params: ApiGetParameters = {}) {
    return this._apiService.apis(params)
      .subscribe((apisModel) => {
        this.apisModel = apisModel.collection.data;

        if (apisModel.collection.next) {
          this.next = apisModel.collection.next.split('?')[1];
        } else {
          this.next = undefined;
        }

        let size = apisModel.collection.total;
        let current = (params.hasOwnProperty('offset'))
          ? this.pagination.page + 1 : this.pagination.page;
        let limit = (params.hasOwnProperty('size'))
          ? parseInt(params.size, 10) : this.pagination.limit;

        this.pagination = paginate(size, current, limit);
      });
  }
}
