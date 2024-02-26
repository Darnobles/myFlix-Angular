import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  updateForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    birthday: new FormControl(''),
    email: new FormControl('')
  });

}
