import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultListPage } from './result-list';

@NgModule({
  declarations: [
    ResultListPage,
  ],
  imports: [
    IonicPageModule.forChild(ResultListPage),
  ],
})
export class ResultListPageModule {}
