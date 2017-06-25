import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';

@Injectable()
export class JsonProviderService {
  private fileObject:any;
  private reader = new FileReader();  
  
  private fileSubject= new BehaviorSubject({});
  public readonly fileObserver = this.fileSubject.asObservable();

  private filterKeySubject= new BehaviorSubject("");
  public readonly filterKeyObserver = this.filterKeySubject.asObservable();


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
    this.updateRecursive(this.fileObject, lookupKey, newValue);
    
    console.log(this.fileObject);
    this.fileObject = JSON.parse(JSON.stringify(this.fileObject));
    this.fileSubject.next(this.fileObject);
  }

  private updateRecursive(rootObject:any, lookupKey: string, newValue:any) {
    Object.keys(rootObject).forEach((key) => {
      if (_.isObject(rootObject[key])) {
        this.updateRecursive(rootObject[key], lookupKey, newValue);
      }

      if (key === lookupKey) {
        if (_.isNumber(newValue)) {
          rootObject[key] = +newValue; 
        } else if (_.isBoolean(newValue)) {
          rootObject[key] = (newValue.toLowerCase() == "true")
        } else if (_.isDate(newValue)) {

        } else if (_.isString(newValue)) {
          rootObject[key] = newValue; 
        }
      }
    });
  }
}