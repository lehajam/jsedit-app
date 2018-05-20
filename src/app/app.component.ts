import { Component, ViewChild } from '@angular/core';
import { JsonTreeViewComponent  } from './json-tree-view/json-tree-view.component';
import { JsonProviderService } from './json-provider/json-provider.service'
import { JsonHelperService, Item } from './json-helper/json-helper.service';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap'

import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

import * as fs from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  file:any;
  fileSelected:boolean;
  activeFilter = false;

  private fileName:string;
  private keys = [];
  public model:any;
  
  @ViewChild(JsonTreeViewComponent)
  private treeView: JsonTreeViewComponent;

  constructor(
    private jsonService: JsonProviderService,
    private helper: JsonHelperService) { 
      this.fileSelected = false;
  }

  fileEvent(fileInput: any){
    this.fileSelected = true;

    this.jsonService
      .load(fileInput.target.files[0])
      .subscribe(
        (obj) => { 
          //first get the json object represented in the file
          this.file = obj;
          this.fileName = fileInput.target.files[0].name; 
          this.helper.getkeysRecursive(obj, this.keys);
          this.keys = Array.from(new Set(this.keys)); 
        });

    this.jsonService.filterKeyObserver.subscribe(
      key => {
        this.activeFilter = key && key != "";
      }
    );
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(term => term.length < 2 ? []
          : this.keys.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  filter(event:NgbTypeaheadSelectItemEvent) { 
    console.log(event.item);
    this.jsonService.addFilterKey(event.item);
  }

  save() {
    let newFile = JSON.stringify(this.treeView.newjson);    
    let blob = new Blob([newFile], { type: 'data:application/json;charset=utf-8' });
    fs.saveAs(blob, this.fileName);
    console.log(blob);

    // Do we want the new file to become the old file ?
    // this.file = JSON.parse(newFile);
  }
}