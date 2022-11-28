import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ProyectsComponent } from './proyects/proyects.component';
import { ContactComponent } from './contact/contact.component';
import { CryptoFormComponent } from './proyects/crypto-form/crypto-form.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ModalService } from './service/modal.service';
import { PreloadService } from './service/preload.service';
import { CanPlayGuard } from './proyects/can-play.guard';
import { SharedModule } from './shared.module';
import { LoginComponent } from './login/login.component';
import { SkillsComponent } from './home/skills/skills.component';
import { UserExpComponent } from './home/user-exp/user-exp.component';
import { EducationComponent } from './home/education/education.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { HeaderComponent } from './home/header/header.component';
import { LocalStorageService } from './service/localStorage.service';
import { NewRegistrationComponent } from './register/new-registration/new-registration.component';
import { SoftSkillsComponent } from './home/soft-skills/soft-skills.component';
import { NewUserComponent } from './register/new-user/new-user.component';
import { CanLoadUserGuard } from './register/new-registration/can-load-user.guard';
import { TokenService } from './backend/service/token.service';
import { UserService } from './backend/service/user.service';
import { EducationService } from './backend/service/education.service';
import { FormEducationComponent } from './home/education/form-education/form-education.component';
import { FormSkillComponent } from './home/skills/form-skill/form-skill.component';
import { FormSoftSkillComponent } from './home/soft-skills/form-soft-skill/form-soft-skill.component';
import { FormUserExpComponent } from './home/user-exp/form-user-exp/form-user-exp.component';
import { TagsComponent } from './home/education/tags/tags.component';
import { AuthService } from './backend/service/auth.service';
import { HardSkillService } from './backend/service/hard-skill.service';
import { SoftSkillService } from './backend/service/soft-skill.service';
import { TagService } from './backend/service/tag.service';
import { WorkExperienceService } from './backend/service/work-experience.service';
import { SpinnerInterceptorComponent } from './service/spinner-interceptor/spinner-interceptor.component';
import { SpinnerService } from './service/spinner-interceptor/spinner.service';

const routing: Routes = [
  { path: '', component: HomeComponent },
  { path: 'proyectos', component: ProyectsComponent },
  { path: 'contacto', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'newRegistration',
    component: NewRegistrationComponent,
  },
  {
    path: 'newUser',
    component: NewUserComponent,
    canActivate: [CanLoadUserGuard],
  },
  {
    path: 'proyectos/encriptador',
    loadChildren: () =>
      import('./proyects/encryptor/encryptor.module').then(
        (m) => m.EncryptorModule
      ),
    canActivate: [CanPlayGuard],
    data: { preload: true },
  },

  {
    path: 'proyectos/ahorcado',
    loadChildren: () =>
      import('./proyects/hanged/hanged.module').then((m) => m.HangedModule),
    canActivate: [CanPlayGuard],

    data: { preload: true },
  },
  {
    path: 'proyectos/chohan',
    loadChildren: () =>
      import('./proyects/chohan/chohan.module').then((m) => m.ChohanModule),
    canActivate: [CanPlayGuard],
    data: { preload: true },
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    ProyectsComponent,
    ContactComponent,
    CryptoFormComponent,
    LoginComponent,
    NewRegistrationComponent,
    NewUserComponent,
    SkillsComponent,
    SoftSkillsComponent,
    UserExpComponent,
    EducationComponent,
    FormEducationComponent,
    FormSkillComponent,
    FormSoftSkillComponent,
    FormUserExpComponent,
    TagsComponent,
    SpinnerInterceptorComponent
  ],
  imports: [
    RouterModule.forRoot(routing, {
      preloadingStrategy: PreloadService,
    }),
    NgCircleProgressModule.forRoot({}),
    HttpClientModule,
    SharedModule,
  ],
  exports: [RouterModule],
  providers: [
    ModalService,
    LocalStorageService,
    TokenService,
    UserService,
    EducationService,
    AuthService,
    HardSkillService,
    SoftSkillService,
    TagService,
    WorkExperienceService,
    SpinnerService
  ],
})
export class RoutingAppModule {}
