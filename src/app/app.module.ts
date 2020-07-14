import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WeatherdisplayComponent } from './weatherdisplay/weatherdisplay.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherdisplayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
