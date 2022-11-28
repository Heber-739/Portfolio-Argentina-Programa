import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner-interceptor',
  template: '<div class="lds-ripple"><div></div><div></div></div>',
  styleUrls: ['./spinner-interceptor.component.css']
})
export class SpinnerInterceptorComponent implements OnInit {
  isLoading: boolean=false;
  constructor() {
    
  }

  ngOnInit(): void {
  }

}
