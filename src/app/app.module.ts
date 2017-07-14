import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ListingsComponent } from './listings.component';
import { SearchComponent } from './search.component';
import { SearchService } from './search.service';
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
    HttpModule,
    JsonpModule
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
