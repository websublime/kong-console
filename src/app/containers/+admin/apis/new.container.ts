import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Container, ApisService, ApisModel, ApisModelResource, SYMBOLS } from '../../../shared';

@Component({
  moduleId: __filename,
  selector: 'new-api',
  templateUrl: './new.template.html',
  providers: [ApisService]
})
export class NewApiContainer extends Container implements OnInit {
  apiModel: ApisModel;
  apiForm: FormGroup;

  constructor(
    private _apiService: ApisService,
    private _router: Router,
    public fb: FormBuilder,
  ) {
    super();
  }

  ngOnInit() {
    this.apiModel = new ApisModel(<ApisModelResource>{
      name: '',
      request_host: '',
      request_path: '',
      upstream_url: '',
      preserve_host: false,
      strip_request_path: false
    });

    this.apiForm = this.fb.group({
      name: new FormControl(this.apiModel.name),
      requestHost: new FormControl(this.apiModel.request_host),
      requestPath: new FormControl(this.apiModel.request_path),
      stripRequestPath: new FormControl(this.apiModel.strip_request_path),
      preserveHost: new FormControl(this.apiModel.preserve_host),
      upstreamUrl: new FormControl(this.apiModel.upstream_url, Validators.required)
    });
  }

  save() {
    console.log(this.apiForm);
    if (!this.apiForm.valid) {
      return;
    }
  }

  cancel(event: MouseEvent) {
    event.preventDefault();

    this._router.navigate([SYMBOLS.ROUTES.APIS.INDEX]);
  }

  reset(event: MouseEvent) {
    event.preventDefault();

    this.apiForm.reset();
  }
}
