// The code below is basically a fork of the https://github.com/temich666/t-json-viewer
// and unfortunatelly it generates some tslint errors.
// The easiest way to deal with them for now is to disable linting in those files :(

/* tslint:disable */
import { Component, OnInit, Input, Output, EventEmitter, Pipe, PipeTransform } from '@angular/core';
import { JsonHelperService, Item } from '../json-helper.service';
import { JsonProviderService } from '../json-provider.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';

@Component({
  selector: 'json-tree-view',
  templateUrl: './json-tree-view.component.html',
  styleUrls: ['./json-tree-view.component.css']
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
  @Output() change: EventEmitter<Item> = new EventEmitter();

  asset: Array<Item> = [];
  private _expanded: boolean = false;

  constructor(
    private jsonService: JsonProviderService,
    private helper: JsonHelperService) {

  }

  ngOnInit() {
    this.jsonService.updateObserver.subscribe(
      update => {
        if(this.asset) {
          for (var index = 0; index < this.asset.length; index++) {
            if(this.asset[index].key == update.key) {
              this.json[update.key] = update.value;
              this.asset = this.helper.createTree(this.json, this.expanded);
              this.change.emit(this.json);
            }
          }
        }
    });
  }
  
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

  clickHandle(item: Item) {
    if (!this.helper.isObject(item)) {
      return;
    }
    item.isOpened = !item.isOpened;
  }

  //propagate the change to parent
  onChildUpdate(jsonChild, key:string) {
    if(this.asset) {
      for (var index = 0; index < this.asset.length; index++) {
        if(this.asset[index].key == key) {
          this.json[key] = jsonChild;
          this.asset = this.helper.createTree(this.json, this.expanded);
          this.change.emit(this.json);
        }
      }
    }
  }
}

@Pipe({
    name: 'keyfilter'
})
export class KeyFilterPipe implements PipeTransform {
    transform(items: Item[], key: string): any {
      if(!items) {
        console.log(key);
        return items.filter(item => key === item.key);
      }
    }
}