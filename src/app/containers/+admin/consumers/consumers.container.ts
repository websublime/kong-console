import { Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Modal } from '../../../components';
import {
  Container, ApisService, ApisModelResource,
  SYMBOLS, paginate, ApiGetParameters, PaginateModel
} from '../../../shared';

@Component({
  moduleId: __filename,
  selector: 'consumers',
  templateUrl: './consumers.template.html',
  styles: [
    `
    .form-group, .input-group {
      margin-left: 10px;
    }
    .input-group {
      width: 20%;
    }
    a {
      cursor: pointer;
    }
    `
  ],
  directives: [Modal]
})
export class ConsumersContainer extends Container implements OnInit, OnDestroy {
  @ViewChild(Modal) modal: Modal;

  constructor(private _router: Router) {
    super();
  }

  ngOnInit() { }

  ngOnDestroy() { }
}