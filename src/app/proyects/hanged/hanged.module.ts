import { NgModule } from '@angular/core';
import { HangedComponent } from './hanged.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';

const routHanged = [{ path: '', component: HangedComponent }];

@NgModule({
  declarations: [HangedComponent],
  imports: [RouterModule.forChild(routHanged), SharedModule],
  exports: [RouterModule],
})
export class HangedModule {}
