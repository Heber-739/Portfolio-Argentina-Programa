import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HardSkillService } from 'src/app/backend/service/hard-skill.service';
import { HardSkill } from 'src/app/interface/hardSkill';

@Component({
  selector: 'app-form-skill',
  templateUrl: './form-skill.component.html',
  styleUrls: ['./form-skill.component.css'],
})
export class FormSkillComponent implements OnInit {
  @Output() finish: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() edithHS: HardSkill = {} as HardSkill;
  myimage: any;
  type_img: any;
  formHS = new FormGroup({
    name: new FormControl('', [Validators.required]),
    percentage: new FormControl('', [Validators.required, Validators.max(100)]),
  });
  constructor(private hsService: HardSkillService) {}

  ngOnInit(): void {
    if (this.edithHS.id != 0) {
      this.formHS.patchValue({
        name: this.edithHS.name,
        percentage: this.edithHS.percentage,
      });
    }
    this.myimage = this.edithHS.img;
    this.type_img = this.edithHS.type_img;
  }

  onchange(e: Event) {
    const target = e.currentTarget as HTMLInputElement;
    let image = target.files?.[0]!;
    this.type_img = image.type;
    this.myimage = this.getBase64(image);
  }
  getBase64(file: File) {
    let reader = new FileReader();
    reader.onload = () => {
      this.myimage = reader.result;
    };
    reader.readAsDataURL(file);
  }
  saveHardSkill() {
    let hs: HardSkill = {
      name: this.formHS.get('name')?.value,
      percentage: this.formHS.get('percentage')?.value,
      img: this.myimage,
      type_img: this.type_img,
    };
    if (this.edithHS.id == 0) {
      this.hsService.createHardSkill(hs);
    } else if (this.edithHS.id != 0) {
      this.hsService.updateHardSkill(this.edithHS.id!, hs);
    }
    this.myimage = '';
    this.formHS.reset();
    this.finish.emit(true);
    this.edithHS = {
      id: 0,
      name: '',
      percentage: 0,
      img: '',
      type_img: '',
    };
  }
}
