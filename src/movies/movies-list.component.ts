import { Component, OnInit } from '@angular/core';
import { templateJitUrl } from '@angular/compiler';
import { IMovies } from './movies';
import { MoviesService } from './movies.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'minimatch';


@Component({
  selector: "mov-app",
  templateUrl: "/movies-list.component.html"
})
export class MoviesListComponent implements OnInit{

  title: String = "Movie List";

   filter = document.getElementById("txtFilter");


  listFilter:string ="The";
  errorMessage: string;

  _listFilter: string;
  //listFilter: string = "Triller";
  get moviesFilter():string{
    return this._listFilter;
  }

  set moviesFilter(value:string){

    this._listFilter = value
    this.filteredMovies = this.listFilter ? this.performFilter(this.listFilter) : this.movies;

  }

  constructor(private moviesService: MoviesService, activatedRoute: ActivatedRoute){}

  filteredMovies:IMovies[] = [];

   movies: IMovies[]= [
    /*{
    "movieId":1,
    "title": "The danger of man",
    "movieUrl": "./assets/image/2.jpeg",
    "prodYear": 2014
  },
  {
    "movieId":2,
    "title": "The end of the magic",
    "movieUrl": "./assets/image/1.jpeg",
    "prodYear": 2015
  },
  {
    "movieId":3,
    "title": "What is the purpose",
    "movieUrl": "./assets/image/2.jpeg",
    "prodYear": 2015
  },
  {
    "movieId":4,
    "title": "What is the purpose",
    "movieUrl": "./assets/image/2.jpeg",
    "prodYear": 2015
  }*/

]

ngOnInit():void{

  this.moviesService.getMovies().subscribe({
    next: movie =>{
      this.movies = movie;
      this.filteredMovies = this.movies;
    },
    error: err => this.errorMessage = err
  }
  )
  // See if we have an autosave value
// (this will only happen if the page is accidentally refreshed)
  if(sessionStorage.getItem("autosave")){
    //restore the item
    this.filter.nodeValue = sessionStorage.getItem("autosave");
  }

  //listen for change in text field
  this.filter.addEventListener("change", function(){
    // And save the results into the session storage object

  // sessionStorage.setItem("autosave", this.filter.value);
  })
}


performFilter(filterBy:string) :IMovies[]{
  filterBy = filterBy.toLocaleLowerCase();
  return this.movies.filter((movie: IMovies) => movie.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
}

/*calPage(){
  for(let i=0; i<this.movies.length/10; i++)
} */


}
