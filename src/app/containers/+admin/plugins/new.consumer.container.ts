import { FormGroup, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { FormService } from './forms';
import { Container } from '../../../core';
import { AlertModel, ComboBox } from '../../../components';
import {
  SYMBOLS, ConsumerService
} from '../../../shared';

@Component({
  moduleId: __filename,
  selector: 'new-consumer-page',
  templateUrl: './new.consumer.template.html',
  providers: [ Title, FormService, ConsumerService ]
})
export class NewConsumerApiContainer extends Container implements OnInit, OnDestroy {
  alertModel: AlertModel;
  formControls: Array<any>;
  consumerForm: FormGroup;
  formTitle: string;
  help: string;

  @ViewChild(ComboBox) combo: ComboBox;

  private formDynamic;

  constructor(
    private title: Title,
    private fS: FormService,
    private router: Router,
    private consumerService: ConsumerService,
    private activeRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.title.setTitle('Associate Plugin');

    let id = this.activeRoute.snapshot.params['id'];
    this.formDynamic = this.fS.getFormGroup(`${id}-consumer`);

    this.formTitle = this.formDynamic.title;
    this.help = this.formDynamic.help();
    this.formControls = this.formDynamic.formControls;
    this.consumerForm = this.formDynamic.createFormGroup();

    this.changeDetection(() => {
      this.consumerForm.addControl('name', new FormControl(id));
      this.consumerForm.addControl('search', this.combo.formCombo.get('search'));
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

    this.consumerForm.reset();
  }

  cancel(event: MouseEvent) {
    event.preventDefault();

    this.router.navigate([SYMBOLS.ROUTES.PLUGINS.INDEX]);
  }

  save() {
    if (!this.consumerForm.valid) {
      return false;
    }

    let consumer = this.consumerForm.value.search;
    this.formDynamic.populate(this.consumerForm.value);
  }

  search(value: string) {
    let params = (value === '*ALL*') ? {} : { username: value };

    this.consumerService.consumers(params)
      .subscribe((consumer) => {
        if (consumer && consumer.collection.total > 0) {
          let data = consumer.collection.data;
          this.combo.model = data.map((rs) => {
            return { id: rs.id, name: rs.username };
          });
        } else {
          this.combo.model = [{ id: undefined, name: 'No results founded.' }];
        }
      });
  }
}
