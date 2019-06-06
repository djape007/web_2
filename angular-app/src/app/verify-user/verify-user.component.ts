import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {

  users: Array<User> = new Array<User>();

  constructor(private _service: ProfileService) { }

  ngOnInit() {
    this.getProcessingUsers();
  }

  getUserPhotos(user: User): Array<string>{
    if(user.Files == '' || user.Files == null)
      return;

    let photos = new Array<string>();
    let photoNames = user.Files.split(',');
    photoNames.forEach(item => {
      photos.push(`http://localhost:52295/imgs/users/${user.Id}/${item}`);
    });

    return photos;
  }

  getProcessingUsers(){
    this._service.getProcessingUsers()
    .subscribe(
      data => {
        this.users = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  deny(){

  }

  verify(){

  }
}
