import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HockeyPage } from './hockey';

@NgModule({
  declarations: [
    HockeyPage,
  ],
  imports: [
    IonicPageModule.forChild(HockeyPage),
  ],
})
export class HockeyPageModule {}
