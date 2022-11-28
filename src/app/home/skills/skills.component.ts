import { Component, Input, OnInit } from '@angular/core';
import { HardSkillService } from 'src/app/backend/service/hard-skill.service';
import { TokenService } from 'src/app/backend/service/token.service';
import { HardSkill } from 'src/app/interface/hardSkill';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  edithMode: boolean = false;
  edithHS: HardSkill = {
    id: 0,
    name: '',
    percentage: 0,
    img: '',
    type_img: '',
  };
  toEdith: boolean = false;
  skills: HardSkill[] = [];
  constructor(
    private token: TokenService,
    private hsService: HardSkillService
  ) {}

  ngOnInit(): void {
    this.hsService.subscribeHSs().subscribe({
      next: (res) => (this.skills = res),
    });
    if (this.hsService.getLocalHardSkill().length > 0) {
      this.skills = this.hsService.getLocalHardSkill();
    } else {
      this.hsService.getHardSkill();
    }
    this.token.edithObservable().subscribe({
      next: (res) => (this.edithMode = res),
    });
  }

  addSkill() {
    this.toEdith = !this.toEdith;
    this.edithHS = {
      id: 0,
      name: '',
      percentage: 0,
      img: '',
      type_img: '',
    };
  }
  delete(i: HardSkill) {
    this.hsService.removeHSToUser(i.id!, this.token.getUsername());
  }
  edith(i: HardSkill) {
    this.edithHS = i;
    this.toEdith = true;
  }
  finish(ev: boolean) {
    this.toEdith = !ev;
  }
}
