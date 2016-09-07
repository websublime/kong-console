import { Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Container } from '../../../core';
import { Modal } from '../../../components';
import {
  ConsumerService, ConsumerModelResource,
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
  providers: [ ConsumerService ]
})
export class ConsumersContainer extends Container implements OnInit, OnDestroy {
  next: string;
  total: string;
  toolsGroup: FormGroup;
  pagination: PaginateModel = paginate(1);
  consumersModel: Array<ConsumerModelResource>;
  entriesLength: Array<number> = SYMBOLS.TABLE.ENTRIES;

  @ViewChild(Modal) modal: Modal;

  constructor(private consumer: ConsumerService, private router: Router) {
    super();
  }

  ngOnInit() {
    this.toolsGroup = new FormGroup({
      entries: new FormControl(this.entriesLength[0]),
      search: new FormControl()
    });
  }

  ngOnDestroy() { }

  onSearch(event: MouseEvent) { }

  onPrevious(event: MouseEvent) { }

  onNext(event: MouseEvent) { }

  onDelete(event: MouseEvent, id: string, name: string) { }

  goToNewConsumer(event: MouseEvent) {
    event.preventDefault();

    this.router.navigate([SYMBOLS.ROUTES.APIS.NEW]);
  }

  private getConsumers() { }
}
