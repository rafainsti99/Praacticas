import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'PracticaRafaYPaco';
  users;



constructor(
  protected userService :UserService
){}


ngOnInit() {
  this.userService.getAutores()
  .subscribe(
    
    (data) => { // Success
      console.log(data);
      this.users = data; 
         
    }
  );




console.log();

  
}
}

















