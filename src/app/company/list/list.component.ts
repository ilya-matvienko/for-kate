import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Company } from '../interface';

@Component({
  selector: 'list',
  templateUrl: 'list.tpl.pug',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  @Input() list: Company[];

  @Output() inited: EventEmitter<any> = new EventEmitter();
  @Output() added: EventEmitter<any> = new EventEmitter();
  @Output() searching: EventEmitter<string> = new EventEmitter();
  @Output() selected: EventEmitter<Company> = new EventEmitter();

  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      searchCompany: '',
    });
  }

  ngOnInit() {
    this.inited.emit();
  }

  addCompany() {
    this.added.emit();
  }

  search() {
    this.searching.emit(this.form.value.searchCompany.toLowerCase());
  }

  select(item) {
    this.selected.emit(item);
  }
}
