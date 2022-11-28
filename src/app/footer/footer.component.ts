import { Component, OnInit } from '@angular/core';
import { UserService } from '../backend/service/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  github: string = '';
  linkedin: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
this.userService.subscribeUser().subscribe({
  next:(res)=>{
    this.github=res.github;
    this.linkedin=res.linkedin;
  }
})
  }

}
 