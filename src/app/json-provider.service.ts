import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';

@Injectable()
export class JsonProviderService {
  private reader = new FileReader();  

  private fileSubject= new BehaviorSubject({});
  public readonly fileObserver = this.fileSubject.asObservable();

  constructor() { 
    this.reader.onload = () => {
      let fileObject = JSON.parse(this.reader.result);
      this.fileSubject.next(fileObject);
    } 
  }

  public load(file: File) : Observable<any> {
    this.reader.readAsText(file);
    return this.fileObserver;
  }
}