import { Component, Input, OnInit } from '@angular/core';
import { DataUser } from 'src/app/interface/dataUser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() user!: DataUser;

  constructor() {}

  ngOnInit(): void {}
}
