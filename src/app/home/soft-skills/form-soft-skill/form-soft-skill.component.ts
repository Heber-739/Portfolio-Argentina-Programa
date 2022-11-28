import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SoftSkillService } from 'src/app/backend/service/soft-skill.service';
import { SoftSkill } from 'src/app/interface/softSkill';

@Component({
  selector: 'app-form-soft-skill',
  templateUrl: './form-soft-skill.component.html',
  styleUrls: ['./form-soft-skill.component.css'],
})
export class FormSoftSkillComponent implements OnInit {
  @Output() finish: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() edithSS: SoftSkill = { id: 0, name: '', description: '' };
  ssId: number = 0;
  formSS = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  constructor(private ssService: SoftSkillService) {}

  ngOnInit(): void {
    if (this.edithSS.id != 0) {
      this.formSS.patchValue({
        name: this.edithSS.name,
        description: this.edithSS.description,
      });
      this.ssId = this.edithSS.id!;
    }
  }

  saveSS() {
    let ss: SoftSkill = {
      name: this.formSS.get('name')?.value,
      description: this.formSS.get('description')?.value,
    };
    if (this.edithSS.id != 0) {
      ss.id = this.edithSS.id;
      this.ssService.updateSoftSkill(ss);
    } else if (this.edithSS.id == 0) {
      this.ssService.createSoftSkill(ss);
    }
    this.formSS.reset();
    this.finish.emit(true);
    this.edithSS = { id: 0, name: '', description: '' };
  }
}
