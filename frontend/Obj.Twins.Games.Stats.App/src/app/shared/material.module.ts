import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';




@NgModule({
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatDividerModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    SatDatepickerModule,
    SatNativeDateModule,
  ],
  providers: [
    MatDatepickerModule,
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatDividerModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    SatDatepickerModule,
    SatNativeDateModule,
  ]
})
export class MaterialModule { }
