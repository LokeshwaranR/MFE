import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ChartModule } from 'primeng/chart';
import { HttpClientModule } from '@angular/common/http';
import { ReactDataService } from './react-data.service';
// import { EventPublisherService } from './eventBus.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    HttpClientModule
  ],
  providers: [ReactDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
