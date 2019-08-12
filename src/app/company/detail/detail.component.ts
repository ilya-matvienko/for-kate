import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { mergeDeepRight } from 'ramda';

import { Company } from '../interface';

@Component({
  selector: 'detail',
  templateUrl: 'detail.tpl.pug',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent implements OnInit {
  @Input() item: Company;

  @Output() saved: EventEmitter<Company> = new EventEmitter();
  @Output() closed: EventEmitter<any> = new EventEmitter();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: '',
      ceo: '',
      phone: '',
      email: '',
      address: '',
      passport: '',
    });
  }

  ngOnInit() {
    this.form = this.fb.group(mergeDeepRight({ ...this.form.value }, { ...this.item }));
  }

  save() {
    if (!this.form.value.name) return;
    this.saved.emit({ ...this.form.value, id: this.item.id || null });
  }

  back() {
    this.closed.emit();
  }
}
