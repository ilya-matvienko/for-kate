import { ChangeDetectorRef, ChangeDetectionStrategy, Component } from '@angular/core';

import { propEq, append, without, ascend, sort, prop, last } from 'ramda';

import { getItemStorage, setItemStorage } from '../storage.utils';
import { storageKey } from './const';
import { Company } from './interface';

@Component({
  selector: 'company',
  templateUrl: 'company.tpl.pug',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyController {
  list: Company[];
  select: Company | {} | null = null;

  private company: Company[];

  constructor(private ref: ChangeDetectorRef) { }

  onLoad() {
    this.company = this.list = JSON.parse(getItemStorage(storageKey));
    this.ref.detectChanges();
  }

  addCompany() {
    this.select = {};
  }

  onSearch(phrase) {
    if (!phrase) {
      this.list = this.company;
      return;
    }

    this.list = this.company.filter(item => {
      for (const key in item) {
        const value = item[key].toString().toLowerCase();

        if (value.includes(phrase)) return item;
      }
    });
  }

  onSelect(item) {
    this.select = item;
  }

  onSave(item) {
    const company = this.company.find(propEq('id', item.id));

    if (company) {
      const list = append(item, without([company], this.company));

      setItemStorage(storageKey, JSON.stringify(sort(ascend(prop('id')), list)));
    } else {
      const lastElem = last(this.company);
      const id = lastElem ? lastElem.id + 1 : 1;

      setItemStorage(storageKey, JSON.stringify(append({ ...item, id }, this.company)));
    }

    this.select = null;
  }

  back() {
    this.select = null;
  }
}
