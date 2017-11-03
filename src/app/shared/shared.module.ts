import { NgModule } from '@angular/core';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule
  ]
})
export class SharedModule {}
