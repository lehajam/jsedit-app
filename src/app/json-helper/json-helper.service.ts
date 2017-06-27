import { Injectable } from '@angular/core';
import * as _ from 'lodash';

export interface Item {
  key: string;
  value: any;
  title: string;
  type: string;
  isOpened: boolean;
}

@Injectable()
export class JsonHelperService {
  constructor() {
   }

  public createTree(json: any, isExpanded:boolean) : Array<Item> {
    let tree = [];
    Object.keys(json).forEach((key) => {
      tree.push(this.createItem(key, json[key], isExpanded));
    });
    return tree;
  }

  public createItem(
    key: any, 
    value: any, 
    expanded: boolean): Item {
    
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
      item.isOpened = expanded;
    }

    else if (_.isObject(item.value)) {
      item.type = 'object';
      item.title = `Object ${JSON.stringify(item.value)}`;
      item.isOpened = expanded;
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

  public cast(type:string, value:string) :any {
    switch (type) {
      case 'string':
        return value;
      case 'number':
        return +value;
      case 'boolean':
        return value.toLowerCase() == 'true';
      case 'date':
        return Date.parse(value);
      case 'null':
      case 'undefined':
        return value;
      default:
        break;
    }
  }

  public isObject(item: Item): boolean {
    return ['object', 'array'].indexOf(item.type) !== -1;
  }

  public getkeysRecursive(root:object, keys:string[]) : void {
    Object.keys(root).forEach((key) => {
      if (_.isObject(root[key])) {
        this.getkeysRecursive(root[key], keys)
      } else {
        keys.push(key);
      }
    });
  }

  public filter(root:object, selectedKeys:string[]) : Boolean {
    let keysToDelete = [];
    Object.keys(root).forEach((key) => {
      if (!selectedKeys.find(k => k === key)) {
        if (_.isObject(root[key])) {
          if(!this.filter(root[key], selectedKeys)) {
            keysToDelete.push(key);
          }
        }
        else {
          keysToDelete.push(key);
        }
      }
    });  

    keysToDelete.forEach((key) => {
      delete root[key];
    });

    return keysToDelete.length < Object.keys(root).length;
  }
}