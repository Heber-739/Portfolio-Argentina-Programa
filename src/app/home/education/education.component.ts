import { Component, HostListener, OnInit } from '@angular/core';
import { EducationService } from 'src/app/backend/service/education.service';
import { TokenService } from 'src/app/backend/service/token.service';
import { Education } from 'src/app/interface/education';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  movil: boolean = false;
  edithMode: boolean = false;
  toEdith: boolean = false;
  eds: Education[] = [];
  edithEd: Education = {
    id: 0,
    name: '',
    link: '',
    finish: false,
    img: '',
    type_img: '',
  };

  constructor(private token: TokenService, private ed: EducationService) {}

  ngOnInit(): void {
    this.onResize()
    this.ed.subscribeEds().subscribe({
      next: (res) => (this.eds = res),
    });
    this.token.edithObservable().subscribe({
      next: (res) => (this.edithMode = res),
    });

    if (this.ed.getLocalEducations().length > 0) {
      this.eds = this.ed.getLocalEducations();
    } else {
      this.ed.getEducation();
    }
  }
  @HostListener('window:resize')
	onResize() {
    if(window.innerWidth < 600) this.movil = true
    if(window.innerWidth >= 600) this.movil = false
	}
 
  addEducation() {
    this.toEdith = !this.toEdith;
    this.edithEd = {
      id: 0,
      name: '',
      link: '',
      finish: false,
      img: '',
      type_img: '',
    };
  }
  delete(e: Education) {
    this.ed.deleteEducation(e.id!);
  }
  edith(e: Education) {
    this.edithEd = e;
    this.toEdith = !this.toEdith;
    
  }
  finish(ev: boolean) {
    this.toEdith = ev;
    this.edithEd = {
      id: 0,
      name: '',
      link: '',
      finish: false,
      img: '',
      type_img: '',
    };
  }
}
