import { Component } from '@angular/core';
import { JsonProviderService } from './json-provider.service'
import { JsonTreeViewComponent  } from './json-tree-view/json-tree-view.component';
import { JsonHelperService, Item } from './json-helper.service';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap'

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

class ComponentItem implements Item {
  key: string;
  value: any;
  title: string;
  type: string;
  isOpened: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private file:any;
  private filteredFile:any;

  private keys = [];
  public model: any;

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
}