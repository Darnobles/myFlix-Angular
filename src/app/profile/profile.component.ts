import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  @Input() userData: any = { Username: '', Password: '', Email: '', Birthday: '', FavoriteMovies:[], };

  updateForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    birthday: new FormControl(''),
    email: new FormControl(''),
  });

  constructor(public fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    this.getUser();
    this.getFavoriteMovies();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.updateForm.patchValue({
        userName: resp.Username,
        password: resp.Password,
        birthday: resp.Birthday,
        email: resp.Email,
      });
    },
    (error) => {
      console.error('Error fetching user data:', error);
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.userData.FavoriteMovies = resp; // Assuming resp is an array of favorite movies
    },
    (error) => {
      console.error('Error fetching favorite movies:', error);
    });
  }

onSubmit() {
  console.log(this.updateForm.value);
}

deleteUser(): void {

}
}