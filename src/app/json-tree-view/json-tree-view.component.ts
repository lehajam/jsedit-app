// The code below is basically a fork of the https://github.com/temich666/t-json-viewer
// and unfortunatelly it generates some tslint errors.
// The easiest way to deal with them for now is to disable linting in those files :(

/* tslint:disable */
import { Component, OnInit, OnChanges, Input, ViewEncapsulation } from '@angular/core';
import * as _ from 'lodash';

interface Item {
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
  asset: Array<Item> = [];
  private _expanded: boolean = false;

  ngOnChanges() {
    // Do nothing without data
    if (!_.isObject(this.json) && !_.isArray(this.json)) {
      this.asset = [];
      return;
    }

    console.log(this.json);

    /**
     * Convert json to array of items
     */
    this.asset = [];
    Object.keys(this.json).forEach((key) => {
      this.asset.push(this.createItem(key, this.json[key]));
    });
  }

  ngOnInit() {
  }

  /**
   * Check value and Create item object
   * @param {string|any} key
   * @param {any} value
   */
  private createItem(key: any, value: any): Item {
    let item: Item = {
      key: key || '""', // original key or empty string
      value: value, // original value
      title: value, // title by default
      type: undefined,
      isOpened: false
    };

    if (_.isString(item.value)) {
      item.type = 'string';
      item.title = `"${item.value}"`;
    }

    else if (_.isNumber(item.value)) {
      item.type = 'number';
    }

    else if (_.isBoolean(item.value)) {
      item.type = 'boolean';
    }

    else if (_.isDate(item.value)) {
      item.type = 'date';
    }

    else if (_.isFunction(item.value)) {
      item.type = 'function';
    }

    else if (_.isArray(item.value)) {
      item.type = 'array';
      item.title = `Array[${item.value.length}] ${JSON.stringify(item.value)}`;
      item.isOpened = this.expanded;
    }

    else if (_.isObject(item.value)) {
      item.type = 'object';
      item.title = `Object ${JSON.stringify(item.value)}`;
      item.isOpened = this.expanded;
    }

    else if (item.value === null) {
      item.type = 'null';
      item.title = 'null'
    }

    else if (item.value === undefined) {
      item.type = 'undefined';
      item.title = 'undefined'
    }

    item.title = '' + item.title; // defined type or 'undefined'

    return item;
  }

  /**
   * Check item's type for Array or Object
   * @param {Item} item
   * @return {boolean}
   */
  isObject(item: Item): boolean {
    return ['object', 'array'].indexOf(item.type) !== -1;
  }

  /**
   * Handle click event on collapsable item
   * @param {Item} item
   */
  clickHandle(item: Item) {
    if (!this.isObject(item)) {
      return;
    }
    item.isOpened = !item.isOpened;
  }

}
