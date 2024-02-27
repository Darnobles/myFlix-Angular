import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss'],
})
export class FavoriteMoviesComponent {
  userData = { FavoriteMovies: [] };

  constructor(
    public dialog: MatDialog,
    public router: Router,
    public dialogRef: MatDialogRef<FavoriteMoviesComponent>,
    public snackBar: MatSnackBar,
    public fetchApiData: FetchApiDataService
  ) {}

  addMovie(): void {
    this.fetchApiData.getFavoriteMovies().subscribe(
      (result) => {
        this.dialog.closeAll(); // Close all dialogs if any are open
        this.snackBar.open(result, 'OK', { duration: 2000 });
        this.router.navigate(['movies']); // Navigate to movies page after successful addition
      },
      (error) => {
        this.snackBar.open(error, 'OK', { duration: 2000 });
      }
    );
  }
}
