import { Component, OnInit } from '@angular/core';
import { TokenService } from '../backend/service/token.service';
import { UserService } from '../backend/service/user.service';
import { DataUser } from '../interface/dataUser';
import { SpinnerService } from '../service/spinner-interceptor/spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLoading: boolean=false;
  edithMode: boolean = false;
  user: DataUser = {} as DataUser;
  isLogged: boolean = false;

  constructor(private spinnerService: SpinnerService,private userService: UserService, private token: TokenService) {
    this.spinnerService.subscribeLoading().subscribe({
      next:(res)=>this.isLoading=res
    })
    this.token.loggedObservable().subscribe({
      next: (res) => {
        this.isLogged = res;
      },
    });
    this.userService.subscribeUser().subscribe({
      next: (res) => {
        this.user = res;
      },
    });
  }
  ngOnInit(): void {
    this.token.edithObservable().subscribe({
      next: (res) => (this.edithMode = res),
    });
    if (!this.token.getUser()) {
      this.userService.getDefault().subscribe({
        next: (res) => {
          this.user = res;
          this.token.setUser(res);
        },
      });
    } else {
      this.user = this.token.getUser();
      this.token.changeObservable(true);
    }
  }
  edithModeEnter() {
    this.token.changeEdithObservable(true);
  }
  edithModeExit() {
    this.token.changeEdithObservable(false);
  }
}
