import { FormControl, FormGroup } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

@Component({
  moduleId: __filename,
  selector: 'combo-box',
  templateUrl: './combo.template.html'
})
export class ComboBox implements OnInit, OnDestroy {
  @Input() model: any;
  @Input() holder: string = 'Type for search.';
  @Input() minimum: number = 3;
  @Output() events = new EventEmitter<any>();

  visible: boolean = false;
  formCombo: FormGroup;

  private subscription: Subscription;

  ngOnInit() {
    this.formCombo = new FormGroup({
      search: new FormControl('')
    });

    this.subscription = this.formCombo.get('search').valueChanges
      .subscribe((input: string) => {
        if (input && input.length >= this.minimum) {
          this.events.emit({ search: input });
          this.visible = true;
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onOut(event: Event) {
    this.visible = false;
  }

  onList(event: MouseEvent) {
    event.preventDefault();

    this.visible = true;
    this.events.emit({ search: '*ALL*' });
  }

  onSelect(entry: any) {
    this.events.emit({ select: { id: entry.id, name: entry.name } });
    this.formCombo.get('search').setValue(entry.name);

    setTimeout(() => { this.visible = false; }, 10);
  }
}
