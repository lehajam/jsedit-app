import { Component, OnInit } from '@angular/core';
import { JsonProviderService } from '../json-provider/json-provider.service'

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
      this.jsonService.addFilterKey(this.currentKey);
    }    
  }

  deleteBadge(event, index) {
    console.log(index);
    if (index !== -1) {
      let deletedKey = this.filterKeys[index];
      this.filterKeys.splice(index, 1);
      this.jsonService.rollBack(deletedKey);

      //we might be deleting the item which isnt currently selected
      if(this.currentKey == deletedKey) {
        this.currentKey = "";
        this.isSelected = false;
        this.jsonService.addFilterKey(this.currentKey);
      }
    }
  }

  updateFileObject(newValue: any) {
    console.log(newValue);
    if(this.isSelected && this.currentKey != "") {
      this.jsonService.update(this.currentKey, newValue);
    }
  }
}
