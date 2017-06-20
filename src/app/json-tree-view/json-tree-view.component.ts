// The code below is basically a fork of the https://github.com/temich666/t-json-viewer
// and unfortunatelly it generates some tslint errors.
// The easiest way to deal with them for now is to disable linting in those files :(

/* tslint:disable */
import { Component, OnInit, OnChanges, Input, ViewEncapsulation } from '@angular/core';
import { JsonHelperService, Item } from '../json-helper.service';
import * as _ from 'lodash';

class ComponentItem implements Item {
  key: string;
  value: any;
  title: string;
  type: string;
  isOpened: boolean;
}

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
  asset: Array<ComponentItem> = [];
  private _expanded: boolean = false;

  constructor(private helper: JsonHelperService) { }

  ngOnChanges() {
    // Do nothing without data
    if (!_.isObject(this.json) && !_.isArray(this.json)) {
      this.asset = [];
      return;
    }

    console.log(this.json);

    var objectOrArrayAction = (item: ComponentItem) : void => {
      item.isOpened = this.expanded;
    }
    
    this.asset = this.helper.createTree<ComponentItem>(
      this.json, 
      { isOpened: false },
      objectOrArrayAction, 
      objectOrArrayAction);
    console.log(this.asset); 
  }

  ngOnInit() {
  }

  clickHandle(item: ComponentItem) {
    if (!this.helper.isObject(item)) {
      return;
    }
    item.isOpened = !item.isOpened;
  }

}
