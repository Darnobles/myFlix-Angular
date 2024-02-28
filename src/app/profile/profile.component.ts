import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '', FavoriteMovies:[], };

  updateForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    birthday: new FormControl(''),
    email: new FormControl(''),
  });

  movies: any[] = [];
  constructor(public fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    this.getFavoriteMovies();
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.userData.Username = resp;
      this.userData.Password = resp;
      this.userData.Birthday = resp;
      this.userData.Email = resp;
      this.userData.FavoriteMovies = resp;
    },
    (error) => {
      console.error('Error fetching user data:', error);
    }
    )
  };

  getFavoriteMovies(): void {
  //   this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
  //     this.user.FavoriteMovies = resp;
  //     console.log(this.user.FavoriteMovies);
  //     return this.user.FavoriteMovies;
  //   });
  // }
};

onSubmit() {
  console.log(this.updateForm.value);
}

deleteUser(): void {

}
}