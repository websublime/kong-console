import { Component, OnInit } from '@angular/core';
import { Container, StatusService } from '../../shared';

@Component({
  moduleId: __filename,
  selector: 'home',
  templateUrl: './home.template.html',
  providers: [StatusService]
})
export class HomeContainer extends Container implements OnInit {

  constructor(private _statusService: StatusService) {
    super();
  }

  ngOnInit() {
    this._statusService.status()
      .subscribe((rs) => {
        console.log(rs);
      });
  }
}
