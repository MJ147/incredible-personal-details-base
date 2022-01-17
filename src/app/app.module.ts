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
import { MatPaginatorModule } from '@angular/material/paginator';
import { PersonalDetailsFormComponent } from './components/personal-details-form/personal-details-form.component';

@NgModule({
	declarations: [AppComponent, PersonalDetailsListComponent, PersonalDetailsFormComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,

		MatToolbarModule,
		ReactiveFormsModule,
		MatInputModule,
		MatFormFieldModule,
		MatTableModule,
		MatIconModule,
		MatButtonModule,
		MatPaginatorModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
