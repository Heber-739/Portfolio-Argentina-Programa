import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MailService } from '../backend/service/mail.service';
import { Mail } from '../interface/mail';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  ventana: Window = window;
  emailForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
    ]),
  });

  constructor(private mailService: MailService) {}

  ngOnInit(): void {}
  send() {
    let mail: Mail = {
      name: this.emailForm.get('name')?.value,
      mail: this.emailForm.get('email')?.value,
      message: this.emailForm.get('message')?.value,
    };
    this.mailService.sendMail(mail);
    this.emailForm.reset();
  }
}
