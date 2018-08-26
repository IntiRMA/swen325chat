import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeveloperinfoPage } from './developerinfo';

@NgModule({
  declarations: [
    DeveloperinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(DeveloperinfoPage),
  ],
})
export class DeveloperinfoPageModule {}
