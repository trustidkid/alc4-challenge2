import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { IMovies } from './movies';
import { MoviesService } from './movies.service';

@Component({
  templateUrl: './movies-detail.component.html'
})
export class MoviesDetailComponent implements OnInit{

  title:string = "Movie Details";
  movies:IMovies | undefined;
  errorMessage = "";

  constructor(private route: ActivatedRoute, private moviesService: MoviesService, private router: Router){}

  ngOnInit(){
    const param = +this.route.snapshot.paramMap.get('id');
    if(param){
      const id = +param;
      this.getMovie(id);
    }
    //this.title += `: ${id}`;
   /* this.movies= {
      "movieId":id,
      "title": "The danger of man",
      "movieUrl": "./assets/image/2.jpeg",
      "prodYear": 2014 */

  }

  getMovie(id: number){
    this.moviesService.getMovie(id).subscribe({
      next: movies => this.movies = movies,
      error: err => this.errorMessage = err
    }
    );
  }

  onBack(): void{
    this.router.navigate(['/movies']);
  }



}
