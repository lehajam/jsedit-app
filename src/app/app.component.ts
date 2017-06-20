import { Component } from '@angular/core';
import { JsonProviderService } from './json-provider.service'
import { JsonTreeViewComponent  } from './json-tree-view/json-tree-view.component';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private file:any;
  private keys:string[];
  public model: any;

  constructor(private jsonService: JsonProviderService) { 
  }

  fileEvent(fileInput: any){
      this.jsonService
        .load(fileInput.target.files[0])
        .subscribe(
          (obj) => { 
            //first get the json object represented in the file
            this.file = obj;
            console.log(this.file); 

            //then the keys from the object
            this.keys = Object.keys(obj);
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
}