import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { PersonalDetailsListComponent } from './components/personal-details-list/personal-details-list.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PersonalDetailsFormComponent } from './components/personal-details-form/personal-details-form.component';
import { DeletePopupComponent } from './components/popups/delete-popup/delete-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [AppComponent, PersonalDetailsListComponent, PersonalDetailsFormComponent, DeletePopupComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		RouterModule,

		MatToolbarModule,
		ReactiveFormsModule,
		MatInputModule,
		MatFormFieldModule,
		MatTableModule,
		MatIconModule,
		MatButtonModule,
		MatDialogModule,
		MatSnackBarModule,
	],
	providers: [{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }],
	bootstrap: [AppComponent],
})
export class AppModule {}
