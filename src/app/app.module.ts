import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ListingsComponent } from './listings.component';
import { SearchComponent } from './search.component';
import { ListingComponent } from './listing.component';

@NgModule({
  declarations: [
    AppComponent,
    ListingsComponent,
    SearchComponent,
    ListingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
