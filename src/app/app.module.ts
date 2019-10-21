import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { FormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import { MoviesListComponent } from 'src/movies/movies-list.component';
import { NavBarComponent } from './nav/nav-bar.component';
import { from } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MoviesDetailComponent } from 'src/movies/movies-detail.component';

const appRoute: Route[] = [

  {path: 'movies', component: MoviesListComponent},
  {path: 'movies/:id', component: MoviesDetailComponent},
  {path: '', redirectTo: 'movies', pathMatch: 'full'},
  {path: '**', redirectTo:'movies', pathMatch: 'full'},
]

@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    NavBarComponent,
    MoviesDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoute,
      {enableTracing: true}
    ),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
