import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MatDialog } from '@angular/material/dialog';
import { FavoriteMoviesComponent } from '../favorite-movies/favorite-movies.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog) { }

ngOnInit(): void {
  this.getMovies();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openSynopsisComponentDialog(): void {
    this.dialog.open(SynopsisComponent, {
      width: '280px'
    });
  }

  openGenreComponentDialog(): void {
    this.dialog.open(GenreComponent, {
      width: '280px'
    });
  }

  openDirectorDialog(): void {
    this.dialog.open(DirectorComponent, {
      width: '280px'
    });
  }

  openFavoriteMoviesComponentDialog(): void {
    this.dialog.open(FavoriteMoviesComponent, {
      width: '280px'
    });
  }

  addFavoriteMovie(): void {

    }

  logout(): void {

  }
}
