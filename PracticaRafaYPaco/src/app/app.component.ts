import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PracticaRafaYPaco';
  users: any[] =[];



constructor(
  protected userService :UserService
){}


ngOnInit() {
  this.userService.getAutores()
  .subscribe(
    (data) => { // Success
      this.users = data['results'];
    },
    (error) => {
      console.error(error);
    }
  );
}
}

















