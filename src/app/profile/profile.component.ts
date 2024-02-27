import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  updateForm = new FormGroup({
    userName: new FormControl('{user.Username}'),
    password: new FormControl('{user.Password}'),
    birthday: new FormControl('{user.Birthday}'),
    email: new FormControl('{user.Email}'),
  });

  movies: any[] = [];
  constructor(public fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    this.getFavoriteMovies();
  }

  getFavoriteMovies(): void {
  //   this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
  //     this.user.FavoriteMovies = resp;
  //     console.log(this.user.FavoriteMovies);
  //     return this.user.FavoriteMovies;
  //   });
  // }
};

updateUser(): void {

};

deleteUser(): void {

}
}