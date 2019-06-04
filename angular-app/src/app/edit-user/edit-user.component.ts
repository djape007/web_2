import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/models/user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @Input() email: string;
  myForm: FormGroup;
  selectedValue: string;
  user: User;

  constructor(private _service: ProfileService, private _auth: AuthService, private _router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      address: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      surname: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      birthday: ['', Validators.required],
    });

    if(this.email != '')
    this._service.getUser(this.email)
      .subscribe(
        data => {
          this.user = data;
          //var date = data.DateOfBirth;
          //this.user.DateOfBirth = new Date(date);

        },
        err => {
          console.log(err);
        }
      )
  }

  logout(){
    this._auth.logout();
    this._router.navigate(['/home/login']);
  }

  edit(){
    console.log(this.myForm.value);
  }
}
