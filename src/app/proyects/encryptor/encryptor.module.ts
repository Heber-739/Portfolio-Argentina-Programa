import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncryptorComponent } from './encryptor.component';
import { SharedModule } from 'src/app/shared.module';

const routEncryptor: Routes = [{ path: '', component: EncryptorComponent }];

@NgModule({
  declarations: [EncryptorComponent],
  imports: [RouterModule.forChild(routEncryptor), SharedModule],
  exports: [RouterModule],
})
export class EncryptorModule {}
