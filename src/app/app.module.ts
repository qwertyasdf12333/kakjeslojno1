import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDialogModule} from '@angular/material';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';
import {ButtonModule} from '@syncfusion/ej2-angular-buttons';








@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    MatDialogModule,
    DashboardLayoutModule,
    ButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
