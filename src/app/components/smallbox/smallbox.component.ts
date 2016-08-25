import { Component, Input } from '@angular/core';

export interface SmallBoxModel {
  classBg?: string;
  title?: string;
  info?: string;
  icon?: string;
}

@Component({
  moduleId: __filename,
  selector: 'smallbox',
  templateUrl: './smallbox.template.html'
})
export class SmallBox {
  @Input() model: SmallBoxModel;
}
