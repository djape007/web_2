import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../services/main.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  message: string = 'This field is required';

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

  }
}
