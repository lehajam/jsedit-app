// The code below is basically a fork of the https://github.com/temich666/t-json-viewer
// and unfortunatelly it generates some tslint errors.
// The easiest way to deal with them for now is to disable linting in those files :(

/* tslint:disable */
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, Pipe, PipeTransform } from '@angular/core';
import { JsonHelperService, Item } from '../json-helper/json-helper.service';
import { JsonProviderService } from '../json-provider/json-provider.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';

@Component({
  selector: 'json-tree-view',
  templateUrl: './json-tree-view.component.html',
  styleUrls: ['./json-tree-view.component.css']
})
export class JsonTreeViewComponent implements OnInit {
  @Input()
  get json(): Array<any>|Object|any {
    return this._json;
  }
  set json(value: Array<any>|Object|any) {
    this._json = value;
    if(value){
      this.newjson = JSON.parse(JSON.stringify(value));
    }
  }
  @Input()
    get expanded(): boolean {
      return this._expanded;
    }
    set expanded(value: boolean) {
      this._expanded = value;
    }
  @Output() change: EventEmitter<Item> = new EventEmitter();

  asset: Array<Item> = [];
  newjson: Array<any>|Object|any;

  private _json: Array<any>|Object|any;
  private _expanded: boolean = false;
  private ngChangesComplete: boolean = false;
  private filter: string;

  constructor(
    private jsonService: JsonProviderService,
    private helper: JsonHelperService) {
  }

  ngOnInit() {
    this.jsonService.updateObserver.subscribe(
      update => {
        for (var index = 0; index < this.asset.length; index++) {
          if(this.asset[index].key == update.key) {
            if(update.type =="update") {
              this.newjson[update.key] = this.helper.cast(this.asset[index].type, update.value);
            } else if (update.type =="rollback") {
              this.newjson[update.key] = this.json[update.key];
            }

            this.asset = this.helper.createTree(this.newjson, this.expanded);
            this.change.emit(this.newjson);
            console.log(this.newjson);
          }
        }
    });

    this.jsonService.filterKeyObserver.subscribe(
      key => {
        this.filter = key;
      }
    );
  }
  
  ngOnChanges(changes: SimpleChanges) {
    // Do nothing without data
    this.ngChangesComplete = false;
    if (!_.isObject(this.json) && !_.isArray(this.json)) {
      this.asset = [];
      this.ngChangesComplete = true;
      return;
    }

    this.asset = this.helper.createTree(this.json, this.expanded);
    this.ngChangesComplete = true;

    console.log(this.json);   
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
    if(this.ngChangesComplete) {
      for (var index = 0; index < this.asset.length; index++) {
        if(this.asset[index].key == key) {
          this.newjson[key] = jsonChild;
          this.asset[index] = this.helper.createItem(key, jsonChild, this.asset[index].isOpened);
          this.change.emit(this.newjson);
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
      console.log(key);

      if(!items || !key || key == "")
        return items;
      
      return items.filter(item => item.title.indexOf(key) !== -1 || item.key === key);
    }
}