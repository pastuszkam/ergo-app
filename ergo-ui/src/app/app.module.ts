import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResultsListComponent } from './results-list/results-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';


import { SearchService } from './services/search.service';


import { AppComponent } from './app.component';

export function apolloHttpLink(httpLink: HttpLink) {
  return {
    cache: new InMemoryCache(),
    link: httpLink.create({
      uri: 'http://localhost:5000/graphql'
    })
  };
}

@NgModule({
  declarations: [
    AppComponent,
    ResultsListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    MatCardModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatProgressBarModule,
    MatIconModule
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: apolloHttpLink,
    deps: [HttpLink]
  },
  SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
