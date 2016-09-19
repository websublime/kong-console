import { FormGroup, FormControl } from '@angular/forms';
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
  templateUrl: './new.plugin.template.html',
  providers: [ Title, FormService, ApisService ]
})
export class NewPluginContainer extends Container implements OnInit, OnDestroy {
  alertModel: AlertModel;
  formControls: Array<any>;
  pluginForm: FormGroup;
  formTitle: string;
  help: string;

  @ViewChild(ComboBox) combo: ComboBox;

  private formDynamic;

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
    this.formDynamic = this.fS.getFormGroup(`${id}-config`);

    this.formTitle = this.formDynamic.title;
    this.help = this.formDynamic.help();
    this.formControls = this.formDynamic.formControls;
    this.pluginForm = this.formDynamic.createFormGroup();

    this.changeDetection(() => {
      this.pluginForm.addControl('name', new FormControl(id));
      this.pluginForm.addControl('search', this.combo.formCombo.get('search'));
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

    let api = this.pluginForm.value.search;
    this.formDynamic.populate(this.pluginForm.value);

    this.apiService.insertPlugin(api, this.formDynamic.formModel)
      .subscribe(
        (rs) => {
          if (rs.ok) {
            this.alertModel = <AlertModel>{
              visible: true,
              autoHide: true,
              title: '<h4><i class="icon fa fa-check">Plugin Added!</i></h4>',
              info: 'Plugin added with success to API: ' + api + '!',
              close: true,
              classes: 'alert-success'
            };

            setTimeout(() => {
              this.pluginForm.reset();
              this.router.navigate([SYMBOLS.ROUTES.PLUGINS.INDEX]);
            }, 1000);
          }
        },
        (error) => {
          this.alertModel = <AlertModel>{
            visible: true,
            autoHide: true,
            title: '<h4><i class="icon fa fa-ban">Plugin Error!</i></h4>',
            info: `<p>Please check your form.</p>
            <p>Details from server:</p>
            <code>${error.text()}</code>`,
            close: true,
            classes: 'alert-danger'
          };
        }
      );
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
