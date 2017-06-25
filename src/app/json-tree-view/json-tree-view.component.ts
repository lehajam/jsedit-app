// The code below is basically a fork of the https://github.com/temich666/t-json-viewer
// and unfortunatelly it generates some tslint errors.
// The easiest way to deal with them for now is to disable linting in those files :(

/* tslint:disable */
import { Component, OnInit, OnChanges, Input, ViewEncapsulation, Pipe, PipeTransform } from '@angular/core';
import { JsonHelperService, Item } from '../json-helper.service';
import * as _ from 'lodash';

@Component({
  selector: 'json-tree-view',
  templateUrl: './json-tree-view.component.html',
  styleUrls: ['./json-tree-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class JsonTreeViewComponent implements OnInit {

  @Input() json: Array<any>|Object|any;
  @Input()
    get expanded(): boolean {
      return this._expanded;
    }
    set expanded(value: boolean) {
      this._expanded = value;
    }
  @Input() filterKeys: string[];
  
  asset: Array<Item> = [];
  private _expanded: boolean = false;

  constructor(private helper: JsonHelperService) { }

  ngOnChanges() {
    // Do nothing without data
    if (!_.isObject(this.json) && !_.isArray(this.json)) {
      this.asset = [];
      return;
    }

    console.log(this.json);   
    this.asset = this.helper.createTree(this.json, this.expanded);
    console.log(this.asset); 
  }

  ngOnInit() {
  }

  clickHandle(item: Item) {
    if (!this.helper.isObject(item)) {
      return;
    }
    item.isOpened = !item.isOpened;
  }

}

@Pipe({
    name: 'keyfilter'
})
export class KeyFilterPipe implements PipeTransform {
    transform(items: Item[], keys: string[]): any {
      if(!items) {
        console.log(keys);
        return items.filter(
          item => {
            keys.find(key => key === item.key || _.includes(JSON.stringify(item.value), key));
        });
      }
    }
}