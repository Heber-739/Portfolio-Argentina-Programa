import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mail } from 'src/app/interface/mail';
import { Message } from 'src/app/interface/Message';
import { ModalService } from 'src/app/service/modal.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  mailURL: string = `${environment.URL}/sendMail`

  constructor(private popup: ModalService,
    private http: HttpClient) { }

    public sendMail(mail: Mail){
      this.http.post<Message>(this.mailURL,mail).subscribe({
        next: (res) => {
          this.popup.showMessage(res.message);
        },
        error: (err) => this.popup.showMessage(err.error.message)
      });
    }
}
