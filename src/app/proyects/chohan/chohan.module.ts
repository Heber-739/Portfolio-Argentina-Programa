import { NgModule } from '@angular/core';
import { ChohanComponent } from './chohan.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';

const routChohan: Routes = [{ path: '', component: ChohanComponent }];

@NgModule({
  declarations: [ChohanComponent],
  imports: [RouterModule.forChild(routChohan), SharedModule],
  exports: [RouterModule],
})
export class ChohanModule {}
