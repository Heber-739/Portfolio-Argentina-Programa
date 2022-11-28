import { Component, Input, OnInit } from '@angular/core';
import { SoftSkillService } from 'src/app/backend/service/soft-skill.service';
import { TokenService } from 'src/app/backend/service/token.service';
import { SoftSkill } from 'src/app/interface/softSkill';

@Component({
  selector: 'app-soft-skills',
  templateUrl: './soft-skills.component.html',
  styleUrls: ['./soft-skills.component.css'],
})
export class SoftSkillsComponent implements OnInit {
  edithMode: boolean = false;
  toEdith: boolean = false;
  sSs: SoftSkill[] = [];
  edithSS: SoftSkill = { id: 0, name: '', description: '' };

  constructor(
    private token: TokenService,
    private ssService: SoftSkillService
  ) {}

  ngOnInit(): void {
    this.ssService.subscribeSs().subscribe({
      next: (res) => (this.sSs = res),
    });
    if (this.ssService.getLocalSoftSkill().length > 0) {
      this.sSs = this.ssService.getLocalSoftSkill();
    } else {
      this.ssService.getSoftSkill();
    }
    this.token.edithObservable().subscribe({
      next: (res) => (this.edithMode = res),
    });
  }

  addSoftSkill() {
    this.toEdith = !this.toEdith;
    this.edithSS = { id: 0, name: '', description: '' };
  }
  delete(e: SoftSkill) {
    this.ssService.deleteSoftSkill(e.id!);
  }
  edith(ss: SoftSkill) {
    this.addSoftSkill();
    this.edithSS = ss;
  }
  finish(ev: boolean) {
    this.addSoftSkill();
  }
}
