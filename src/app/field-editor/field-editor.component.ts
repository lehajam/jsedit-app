import { Component, OnInit } from '@angular/core';
import { JsonProviderService } from '../json-provider.service'

@Component({
  selector: 'app-field-editor',
  templateUrl: './field-editor.component.html',
  styleUrls: ['./field-editor.component.css']
})
export class FieldEditorComponent implements OnInit {
  private filterKeys = [];
  private isSelected = false;
  private currentKey: string;
  constructor(private jsonService: JsonProviderService) { }

  ngOnInit() {
    this.jsonService.filterKeyObserver.subscribe(
      newKey => {
        if(newKey != "" 
            && !this.filterKeys.find(key => key === newKey)) {
          this.filterKeys.push(newKey);
          console.log(this.filterKeys);

          this.currentKey = newKey; 
          this.isSelected = true;
        }
      }
    );
  }

  selectBadge(event, index) {
    console.log(index);
    if (index !== -1) {
      if(!this.isSelected) {
        this.currentKey = this.filterKeys[index];
        this.isSelected = true;
      } else if (this.currentKey != this.filterKeys[index]) {
        this.currentKey = this.filterKeys[index];
      } 
      else {
        this.currentKey = "";
        this.isSelected = false;        
      }
    }    
  }

  deleteBadge(event, index) {
    console.log(index);
    if (index !== -1) {
      this.filterKeys.splice(index, 1);
      this.currentKey = "";
      this.isSelected = false;
    }
  }

  updateFileObject(newValue: any) {
    console.log(newValue);
    if(this.isSelected && this.currentKey != "") {
      this.jsonService.update(this.currentKey, newValue);
    }
  }
}
