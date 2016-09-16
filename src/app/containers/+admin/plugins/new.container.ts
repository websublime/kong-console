import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Container } from '../../../core';
import { FormService } from './forms';
import { AlertModel, ComboBox } from '../../../components';
import {
  SYMBOLS, ApisService
} from '../../../shared';

@Component({
  moduleId: __filename,
  selector: 'new-plugin-page',
  templateUrl: './new.template.html',
  providers: [ Title, FormService, ApisService ]
})
export class NewPluginContainer extends Container implements OnInit, OnDestroy {
  alertModel: AlertModel;

  @ViewChild(ComboBox) combo: ComboBox;

  constructor(
    private title: Title,
    private fS: FormService,
    private apiService: ApisService,
    private activeRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.title.setTitle('Activate Plugin');
    /*let id = this.activeRoute.snapshot.params['id'];
    let fg = this.fS.getFormGroup(id);
    fg.createFormGroup();
    console.log(fg.formGroup);*/

    this.combo.events
      .subscribe((input: any) => {
        if (input.hasOwnProperty('search')) {
          this.search(input.search);
        }
      });
  }

  ngOnDestroy() {
    this.clean();
  }

  reset() { }

  cancel() { }

  search(value: string) {
    let params = (value === '*ALL*') ? {} : { name: value };

    this.apiService.apis(params)
      .subscribe((api) => {
        console.log(api);
        if (api && api.collection.total > 0) {
          let data = api.collection.data;
          this.combo.model = data;
        }
      });
  }
}
