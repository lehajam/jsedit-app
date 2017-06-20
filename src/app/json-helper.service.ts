import { Injectable } from '@angular/core';
import * as _ from 'lodash';

export interface Item {
  key: string;
  value: any;
  title: string;
  type: string;
}

@Injectable()
export class JsonHelperService {
  constructor() {
   }

  public createTree<T>(json: any, proto:object, objectAction: (Item) => void, arrayAction: (Item) => void) : Array<T> {
    let tree = [];
    Object.keys(json).forEach((key) => {
      tree.push(this.createItem(proto, key, json[key], objectAction, arrayAction));
    });
    return tree;
  }

  private createItem(
    proto:object,
    key: any, 
    value: any, 
    objectAction: (Item) => void, 
    arrayAction: (Item) => void): Item {
    
    let item = Object.setPrototypeOf(
      {
        key: key || '""', // original key or empty string
        value: value, // original value
        title: value, // title by default
        type: undefined
      }, 
      proto);

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
      arrayAction(item);
    }

    else if (_.isObject(item.value)) {
      item.type = 'object';
      item.title = `Object ${JSON.stringify(item.value)}`;
      objectAction(item);
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

  public isObject(item: Item): boolean {
    return ['object', 'array'].indexOf(item.type) !== -1;
  }

  public getkeysRecursive(root:object, keys:string[]) : void {
    Object.keys(root).forEach((key) => {
      if (_.isObject(root[key])) {
        this.getkeysRecursive(root[key], keys)
        keys.push(key);
      } else {
        keys.push(key);
      }
    });
  }

  public filter(root:object, selectedKeys:string[]) {
    
  }
}