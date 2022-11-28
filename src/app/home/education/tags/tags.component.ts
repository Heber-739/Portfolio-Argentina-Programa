import { AfterContentInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EducationService } from 'src/app/backend/service/education.service';
import { TagService } from 'src/app/backend/service/tag.service';
import { Tag } from 'src/app/interface/tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent implements OnInit {
  @Output() end = new EventEmitter<boolean>();
  tags: Tag[] = [];
  allTags: Tag[] = [];
  matchTags: Tag[] = [];
  showAllTags: boolean = false;
  tagForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    abbreviation: new FormControl('', [Validators.required]),
  });

  constructor(private edService: EducationService, private tagS: TagService) {

  }
  
  ngOnInit(): void {
    this.tagS.subscribeTags().subscribe({
      next: (res) => (this.tags = res),
    });
    this.tagS.getAllTags();
    this.allTags = this.tagS.getAllLocalTags();
    this.tagForm.get('name')?.valueChanges.subscribe((e) => {
      if (e.length >= 2) {
        this.tagsShow(e);
        this.showAllTags = true;
      } else if (e.length < 2) this.showAllTags = false;
    });
  }


  add() {
    let tag: Tag = {
      name: this.tagForm.get('name')?.value,
      abbreviation: this.tagForm.get('abbreviation')?.value,
    };
    this.tagS.createTag(tag);
    this.tagForm.reset();
  }
  tagsShow(name: string) {
    this.matchTags = this.allTags.filter((i) => i.name.includes(name));
  }
  tagSelect(tag: Tag) {
    this.tags.push(tag);
    this.tagS.addTagToEducation(tag.id!);
  }
  deleteTag(tag: Tag) {
    if (this.tags.length == 1) this.tags = [];
    this.tagS.removeTagToEducation(tag.id!);
  }
  finished() {
    this.end.emit(false);
    this.edService.getEducation();
  }
}
