import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Message } from 'src/app/interface/Message';
import { Tag } from 'src/app/interface/tag';
import { ModalService } from 'src/app/service/modal.service';
import { environment } from 'src/environments/environment';
import { EducationService } from './education.service';
import { TokenService } from './token.service';

const ALL_DB_TAG = 'getAllTagsFromDB';
const ALL_LOCAL_TAG = 'getAllLocalTags';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  URL: string = `${environment.URL}/tags`;
  private education_id: number =0;
  private edTags$: Subject<Tag[]> = new Subject();

  constructor(
    private token: TokenService,
    private popup: ModalService,
    private http: HttpClient,
  ) { }

  public subscribeTags() {
    return this.edTags$.asObservable();
  }
  public changeObservableTags(tags: Tag[]) {
    this.edTags$.next(tags);
  }
  public setEducationId(id: number){
    this.education_id=id;
    this.getTags();
  }

  /* -------------LocalStorage´s Methods------------- */
  public getAllLocalTags(): Tag[] {
    this.getTags();
    return JSON.parse(window.sessionStorage.getItem(ALL_DB_TAG) || '[]');
  }
  public setAllLocalTags(tags: Tag[]) {
    window.sessionStorage.setItem(ALL_DB_TAG, JSON.stringify(tags));
  }
  public getLocalTags(): Tag[] {
    return JSON.parse(window.sessionStorage.getItem(ALL_LOCAL_TAG) || '[]');
  }
  public setLocalTags(tags: Tag[]) {
    window.sessionStorage.setItem(ALL_LOCAL_TAG, JSON.stringify(tags));
  }


  /* -------------CRUD´s Methods------------- */

  public getAllTags() {
    this.http.get<Tag[]>(this.URL + '/listAll').subscribe({
      next: (res) => this.setAllLocalTags(res),
      error: (err) =>
        this.popup.showMessage(
          `${err.error.message}\n${this.token.errorsMessage(err.error)}`
        ),
    });
  }
  public getTags() {
    this.http.get<Tag[]>(this.URL + `/list/${this.education_id}`).subscribe({
      next: (res) => {
        this.setLocalTags(res);
        this.changeObservableTags(res);
      },
      error: (err) =>
        this.popup.showMessage(
          `${err.error.message}\n${this.token.errorsMessage(err.error)}`
        ),
    });
  }
  public getOne(name: string): Observable<Tag> {
    return this.http.get<Tag>(this.URL + `/getOne/${name}`);
  }
  public addTagToEducation(tagId: number) {
    this.http
      .get<Message>(this.URL + `/add/${tagId}/${this.education_id}`)
      .subscribe({
        next: (res) => this.popup.showMessage(res.message),
        error: (err) =>          this.popup.showMessage(err.error.message),
        complete: () => {
          this.getTags();
          this.popup.showMessage('Agregado correctamente');
        },
      });
  }
  public removeTagToEducation(tagId: number) {
    this.http
      .get<Message>(this.URL + `/remove/${tagId}/${this.education_id}`)
      .subscribe({
        next: (res) => this.popup.showMessage(res.message),
        error: (err) =>
          this.popup.showMessage(
            `${err.error.message}\n${this.token.errorsMessage(err.error)}`
          ),
        complete: () => this.getTags(),
      });
  }
  public createTag(tag: Tag) {  
    tag.educationId = this.education_id;
    console.log(this.education_id)
    this.http.post<Message>(this.URL + '/create', tag).subscribe({
      next: (res) => this.popup.showMessage(res.message),
      error: (err) =>
        this.popup.showMessage(
          `${err.error.message}\n${this.token.errorsMessage(err.error)}`
        ),
      complete: () => this.getTags(),
    });
  }
  public deleteTag(id: number) {
    this.http.delete<Message>(this.URL + `/delete/${id}`).subscribe({
      next: (res) => this.popup.showMessage(res.message),
      error: (err) =>
        this.popup.showMessage(
          `${err.error.message}\n${this.token.errorsMessage(err.error)}`
        ),
        complete: () => this.getTags(),
    });
  }

  public updateTag(tag: Tag) {
    this.http.put<Message>(this.URL + `/update/${tag.id}`, tag).subscribe({
      next: (res) => this.popup.showMessage(res.message),
      error: (err) =>
        this.popup.showMessage(
          `${err.error.message}\n${this.token.errorsMessage(err.error)}`
        ),
        complete: () => this.getTags(),
    });
  }
}
