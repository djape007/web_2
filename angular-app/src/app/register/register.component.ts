import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../services/main.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { User } from 'src/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  message: string = '';

  selectedValue: string;

  constructor(@Inject(forwardRef(() => HomeComponent)) private _parent: HomeComponent,
  private formBuilder: FormBuilder, private _service: MainService, private router: Router) { }

  ngOnInit() {
    this._parent.prikaziDesniMeni();

    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      //password: ['', Validators.required, Validators.pattern(new RegExp('"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$"'))],
      password: ['', Validators.required],
      birthday: ['', Validators.required],
      address: ['', Validators.required, Validators.minLength(2)],
      name: ['', Validators.required, Validators.minLength(2)],
      surname: ['', Validators.required, Validators.minLength(2)],
      type: ['', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  selectChange(){
    this.selectedValue = this.registerForm.get('type').value
  }

  register(){
    if (this.registerForm.invalid) {
      this.message = "Svi podaci su obavezni!";
      return;
    }

    var user = new User();
    user.Email = this.f.email.value;
    user.DateOfBirth = this.f.birthday.value;
    user.Name = this.f.name.value;
    user.Surname = this.f.surname.value;
    user.Address = this.f.address.value;
    user.Password = this.f.password.value;
    user.Type = this.f.type.value;

    this._service.register(user)
      .subscribe(
        data => {
          var a = data;
        },
        err =>{

        }
      )
  }
}
