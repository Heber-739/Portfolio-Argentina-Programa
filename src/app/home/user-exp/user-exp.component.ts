import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/backend/service/token.service';
import { WorkExperienceService } from 'src/app/backend/service/work-experience.service';
import { WorkExp } from 'src/app/interface/workExp';

@Component({
  selector: 'app-user-exp',
  templateUrl: './user-exp.component.html',
  styleUrls: ['./user-exp.component.css'],
})
export class UserExpComponent implements OnInit {
  edithMode: boolean = false;
  toEdith: boolean = false;
  works: WorkExp[] = [];
  edithWorks: WorkExp = {
    id: 0,
    name: '',
    description: '',
  };

  constructor(
    private token: TokenService,
    private workService: WorkExperienceService
  ) {}

  ngOnInit(): void {
    this.workService.subscribeWExp().subscribe({
      next: (res) => (this.works = res),
    });
    this.token.edithObservable().subscribe({
      next: (res) => (this.edithMode = res),
    });

    if (this.workService.getLocalWorkExp().length > 0) {
      this.works = this.workService.getLocalWorkExp();
    } else {
      this.workService.getWorkExp();
    }
  }

  addWorkExp() {
    this.toEdith = !this.toEdith;
  }
  delete(e: WorkExp) {
    this.workService.deleteWorkExp(e.id!);
  }
  edith(e: WorkExp) {
    this.edithWorks = e;
    this.addWorkExp();
  }
  finish(ev: boolean) {
    this.addWorkExp();
  }
}
