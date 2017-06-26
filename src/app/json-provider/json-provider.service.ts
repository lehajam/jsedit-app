import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import * as _ from 'lodash';

@Injectable()
export class JsonProviderService {
  private fileObject:any;
  private reader = new FileReader();  
  
  private fileSubject= new BehaviorSubject({});
  public readonly fileObserver = this.fileSubject.asObservable();

  private filterKeySubject = new BehaviorSubject("");
  public readonly filterKeyObserver = this.filterKeySubject.asObservable();

  private updateSubject = new Subject<any>();
  public readonly updateObserver = this.updateSubject.asObservable();

  constructor() { 
    this.reader.onload = () => {
      this.fileObject = JSON.parse(this.reader.result);
      this.fileSubject.next(this.fileObject);
    } 
  }

  public load(file: File) : Observable<any> {
    this.reader.readAsText(file);
    return this.fileObserver;
  }

  public addFilterKey(key:string){
    this.filterKeySubject.next(key);
  }

  public update(lookupKey: string, newValue:any) {
    let updateObject = {type:"update", key:lookupKey, value:newValue};
    this.updateSubject.next(updateObject);
    console.log(updateObject);
  }

  public rollBack(lookupKey: string) {
    let updateObject = {type:"rollback", key:lookupKey};
    this.updateSubject.next(updateObject);
    console.log(updateObject);
  }
}