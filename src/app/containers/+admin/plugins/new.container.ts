import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { FormService } from './forms';
import { Container } from '../../../core';
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
  formControls: Array<any>;
  pluginForm: FormGroup;
  formTitle: string;
  help: string;

  @ViewChild(ComboBox) combo: ComboBox;

  constructor(
    private title: Title,
    private fS: FormService,
    private router: Router,
    private apiService: ApisService,
    private activeRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.title.setTitle('Activate Plugin');

    let id = this.activeRoute.snapshot.params['id'];
    let fg = this.fS.getFormGroup(id);

    this.formTitle = fg.title;
    this.help = fg.help();
    this.formControls = fg.formControls;
    this.pluginForm = fg.createFormGroup();

    this.changeDetection(() => {
      this.pluginForm.addControl('name', this.combo.formCombo.get('search'));
      // TODO: Delete, only to check if form is given right values
      this.pluginForm.valueChanges.subscribe((value) => { console.log(value); });
    });

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

  reset(event: MouseEvent) {
    event.preventDefault();

    this.pluginForm.reset();
  }

  cancel(event: MouseEvent) {
    event.preventDefault();

    this.router.navigate([SYMBOLS.ROUTES.PLUGINS.INDEX]);
  }

  save() {
    if (!this.pluginForm.valid) {
      return false;
    }

    console.log(this.pluginForm.value);
  }

  search(value: string) {
    let params = (value === '*ALL*') ? {} : { name: value };

    this.apiService.apis(params)
      .subscribe((api) => {
        if (api && api.collection.total > 0) {
          let data = api.collection.data;
          this.combo.model = data;
        } else {
          this.combo.model = [{ id: undefined, name: 'No results founded.' }];
        }
      });
  }
}
