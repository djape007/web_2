import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../services/main.service';
import { UserLogin } from 'src/models/user-login';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  message: string;
  returnUrl: string;

  constructor(@Inject(forwardRef(() => DashboardComponent)) private _parent: DashboardComponent,
    private formBuilder: FormBuilder, private _service: MainService, private router: Router) { }

  ngOnInit() {
    //this._parent.prikaziDesniMeni();
    
    this.loginForm = this.formBuilder.group({
      userid: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  public login(){
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        this.message = "Unesite ime i sifru!";
        return;
    }
    else{
      this._service.login(new UserLogin(this.f.userid.value, this.f.password.value))
        .subscribe(data => {
          if(data){
            let token = data;
            localStorage.setItem('isLoggedIn', "true");
            localStorage.setItem('token', token);

            //this.router.navigate([this.returnUrl]); //redirect to page if loggedIn
          }
        },
        error => {
          this.message = "Ime i sifra nisu validni!";
        });
    }   
  }

}
