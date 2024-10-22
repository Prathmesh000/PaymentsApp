import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../filter.pipe';



@NgModule({
  declarations: [ FilterPipe],
  imports: [
    CommonModule
  ],
  exports: [
    FilterPipe, // Export your pipe here so other modules can use it
  ]
})
export class SharedModule { }
