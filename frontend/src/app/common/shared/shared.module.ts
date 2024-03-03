import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidDirective } from '../directives/valid.directive';
import { BlankComponent } from '../components/blank/blank.component';
import { TableComponent } from '../components/table/table.component';
import { SelectIfActiveDirective } from '../directives/select-if-active.directive';
import { TrCurrencyPipe } from 'tr-currency';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ValidDirective,
    SelectIfActiveDirective,
    BlankComponent,
    TableComponent,
    TrCurrencyPipe,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ValidDirective,
    SelectIfActiveDirective,
    BlankComponent,
    TableComponent,
    TrCurrencyPipe,
  ],
})
export class SharedModule {}
