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

  @Input() id: string;
  myForm: FormGroup;
  passwordForm: FormGroup;
  selectedValue: string;
  user: User;
  message: string = '';
  message_password: string = '';
  selectedFile: File;
  imgURL: any;

  constructor(private _service: ProfileService, private _auth: AuthService, private _router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    if(this.id != '')
    this._service.getUser(this.id)
      .subscribe(
        data => {
          this.user = data;
          var date = new Date(data.DateOfBirth);
          this.myForm = this.formBuilder.group({
            name: [this.user.Name, Validators.compose([Validators.required, Validators.minLength(2)])],
            address: [this.user.Address, Validators.compose([Validators.required, Validators.minLength(2)])],
            surname: [this.user.Surname, Validators.compose([Validators.required, Validators.minLength(2)])],
            birthday: [date, Validators.required],
          });

          this.passwordForm = this.formBuilder.group({
            old_password: ['', Validators.required],
            new_password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            repeat_password: ['', Validators.required],
          });

        },
        err => {
          console.log(err);
        }
      )
  }

  get f() { return this.myForm.controls; }
  get passf() { return this.passwordForm.controls; }

  isSameAsPassword(){
    if (this.passf.new_password.value != this.passf.repeat_password.value)
      this.passf.repeat_password.setErrors({'notsame': true});
  }

  changePassword(){
    this.message_password = '';
    if (this.passwordForm.invalid) {
      return;
    }
    var old_pass = this.passf.old_password.value;
    var new_pass = this.passf.new_password.value;
    var rep_pass = this.passf.repeat_password.value;

    this._service.changePassword(old_pass, new_pass, rep_pass)
      .subscribe(
        data => {
          this.message_password = "Uspesno ste promenuli lozinku"
        },
        err => {
          if(err.error.ModelState[""] == "Incorrect password.")
            this.message_password = "Stara lozinka nije odgovarajuca";
          else
            this.message_password = "Desila se greska";
        }
      )
  }

  logout(){
    this._auth.logout();
    this._router.navigate(['/home/login']);
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(this.selectedFile); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  dodajSliku(){
    
  }

  edit(){
    this.message = '';

    if (this.myForm.invalid) {
      return;
    }

    var user = new User();
    user.Dob = this.f.birthday.value;
    user.Name = this.f.name.value;
    user.Surname = this.f.surname.value;
    user.Address = this.f.address.value;
    user.Id = this.user.Id;

    var arrMonthDayYear = (user.Dob.toLocaleDateString()).split('/');
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
