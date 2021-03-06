import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap'

import { AppComponent } from './app.component';
import { JsonTreeViewComponent, KeyFilterPipe } from './json-tree-view/json-tree-view.component';

import { JsonProviderService } from './json-provider/json-provider.service';
import { JsonHelperService } from './json-helper/json-helper.service';
import { FieldEditorComponent } from './field-editor/field-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    JsonTreeViewComponent,
    KeyFilterPipe,
    FieldEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    NgbTypeaheadModule
  ],
  providers: [
    JsonProviderService,
    JsonHelperService,
    KeyFilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
