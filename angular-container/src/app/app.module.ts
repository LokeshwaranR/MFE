import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {DropdownModule} from 'primeng/dropdown';
import { ParentDataService } from './parent.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DropdownModule,
    FormsModule
  ],
  providers: [ParentDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
