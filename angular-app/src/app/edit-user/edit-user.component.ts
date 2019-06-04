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
  message: string = '';

  constructor(private _service: ProfileService, private _auth: AuthService, private _router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    if(this.email != '')
    this._service.getUser(this.email)
      .subscribe(
        data => {
          this.user = data;
          var date = new Date(this.user.DateOfBirth);
          this.myForm = this.formBuilder.group({
            name: [this.user.Name, Validators.compose([Validators.required, Validators.minLength(2)])],
            address: [this.user.Address, Validators.compose([Validators.required, Validators.minLength(2)])],
            surname: [this.user.Surname, Validators.compose([Validators.required, Validators.minLength(2)])],
            birthday: [date, Validators.required],
          });

        },
        err => {
          console.log(err);
        }
      )
  }

  get f() { return this.myForm.controls; }

  logout(){
    this._auth.logout();
    this._router.navigate(['/home/login']);
  }

  edit(){
    this.message = '';

    if (this.myForm.invalid) {
      return;
    }

    var user = new User();
    user.DateOfBirth = this.f.birthday.value;
    user.Name = this.f.name.value;
    user.Surname = this.f.surname.value;
    user.Address = this.f.address.value;
    user.Id = this.user.Id;

    var arrMonthDayYear = (user.DateOfBirth.toLocaleDateString()).split('/');
    var dobString = `${arrMonthDayYear[2]}-${arrMonthDayYear[0]}-${arrMonthDayYear[1]}`;

    this._service.editUser(user, dobString)
    .subscribe(
      data => {
        this.message = "Uspesno izvrsene promene";
      },
      err => {
        console.log(err);
      }
    )
  }
}
