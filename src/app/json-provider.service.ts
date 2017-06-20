import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class JsonProviderService {
  private reader = new FileReader();  
  private fileSubject= new BehaviorSubject({});
  public readonly fileObserver = this.fileSubject.asObservable();

  constructor() { 
    this.reader.onload = () => {
      this.fileSubject.next(JSON.parse(this.reader.result));
    } 
  }

  load(file: File) : Observable<any> {
    this.reader.readAsText(file);
    return this.fileObserver;
  }

  // getFile() {
  //    return this.fileSubject.asObservable();
  // }

  // clear() {
  //     this.fileSubject.next({});
  // }

  // remove(file: File) {
  //     this.fileSubject.next({});
  // }
}