import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarViewPage } from './calendar-view';
import { CalendarModule } from 'ionic2-calendar-en';

@NgModule({
  declarations: [
    CalendarViewPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarViewPage),
    CalendarModule
  ],
})
export class CalendarViewPageModule {}
