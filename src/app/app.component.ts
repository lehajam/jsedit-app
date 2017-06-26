import { Component, ViewChild } from '@angular/core';
import { JsonTreeViewComponent  } from './json-tree-view/json-tree-view.component';
import { JsonProviderService } from './json-provider/json-provider.service'
import { JsonHelperService, Item } from './json-helper/json-helper.service';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap'

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import * as fs from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private file:any;
  private fileName:string;
  private keys = [];
  public model: any;

  @ViewChild(JsonTreeViewComponent)
  private treeView: JsonTreeViewComponent;

  constructor(
    private jsonService: JsonProviderService,
    private helper: JsonHelperService) { 
  }

  fileEvent(fileInput: any){
      this.jsonService
        .load(fileInput.target.files[0])
        .subscribe(
          (obj) => { 
            //first get the json object represented in the file
            this.file = obj;
            this.fileName = fileInput.target.files[0].name; 
            console.log(this.file); 

            this.helper.getkeysRecursive(obj, this.keys);
            this.keys = Array.from(new Set(this.keys));
            
            console.log(this.keys); 
          }
      );
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.keys.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

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